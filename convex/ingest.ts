import { mutation } from "./_generated/server";
import { v } from "convex/values";

const fileStatValidator = v.object({
  filePath: v.string(),
  linesAdded: v.number(),
  linesDeleted: v.number(),
});

const commitValidator = v.object({
  hash: v.string(),
  message: v.string(),
  timestamp: v.number(),
  contributor: v.object({
    name: v.string(),
    email: v.string(),
  }),
  files: v.array(fileStatValidator),
});

export const ingestData = mutation({
  args: {
    commits: v.array(commitValidator),
  },
  handler: async (ctx, args) => {
    for (const commit of args.commits) {
      // 1. Handle Contributor
      const existingContributor = await ctx.db
        .query("contributors")
        .withIndex("by_email", (q) => q.eq("email", commit.contributor.email))
        .first();

      let contributorId;

      if (existingContributor) {
        contributorId = existingContributor._id;
        // Update lastSeen if this commit is more recent
        if (commit.timestamp > existingContributor.lastSeen) {
          await ctx.db.patch(contributorId, { lastSeen: commit.timestamp });
        }
        // Update firstSeen if this commit is older (unlikely if ingested in order, but good for safety)
        if (commit.timestamp < existingContributor.firstSeen) {
            await ctx.db.patch(contributorId, { firstSeen: commit.timestamp });
        }
      } else {
        contributorId = await ctx.db.insert("contributors", {
          name: commit.contributor.name,
          email: commit.contributor.email,
          firstSeen: commit.timestamp,
          lastSeen: commit.timestamp,
        });
      }

      // 2. Handle Feature (Commit)
      // Check for duplicate hash to avoid re-ingesting the same commit
      // Note: We can't easily use an index on hash because it wasn't defined in the schema provided in step 1.
      // We'll do a scan for now or just rely on the fact that we might just append.
      // However, to be "nice", let's query by contributor and see if we find a matching hash/timestamp or just always insert.
      // Given the schema constraints, let's try to check if we can find it via the contributor index.
      
      const existingFeatures = await ctx.db
        .query("features")
        .withIndex("by_contributor", (q) => q.eq("contributorId", contributorId))
        .collect();
      
      const duplicateFeature = existingFeatures.find(f => f.hash === commit.hash);

      if (duplicateFeature) {
        // Skip if already exists
        continue;
      }

      const featureId = await ctx.db.insert("features", {
        title: commit.message, // Using message as title
        description: commit.message, 
        hash: commit.hash,
        timestamp: commit.timestamp,
        contributorId: contributorId,
      });

      // 3. Handle Feature Files
      for (const file of commit.files) {
        await ctx.db.insert("feature_files", {
          featureId: featureId,
          filePath: file.filePath,
          linesAdded: file.linesAdded,
          linesDeleted: file.linesDeleted,
        });
      }
    }
  },
});