import { v } from "convex/values";
import { query } from "./_generated/server";

export const getContributors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contributors").collect();
  },
});

export const getFeatures = query({
  args: { contributorId: v.optional(v.id("contributors")) },
  handler: async (ctx, args) => {
    let features;

    if (args.contributorId) {
      features = await ctx.db
        .query("features")
        .withIndex("by_contributor", (q) =>
          q.eq("contributorId", args.contributorId!)
        )
        .collect();
    } else {
      features = await ctx.db.query("features").collect();
    }

    // For each feature, get the files
    const featuresWithFiles = await Promise.all(
      features.map(async (feature) => {
        const files = await ctx.db
          .query("feature_files")
          .withIndex("by_feature", (q) => q.eq("featureId", feature._id))
          .collect();
        return {
          ...feature,
          files,
        };
      })
    );

    return featuresWithFiles;
  },
});