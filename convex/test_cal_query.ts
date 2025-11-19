import { internalQuery } from "./_generated/server";

export const inspectResults = internalQuery({
  args: {},
  handler: async (ctx) => {
    const features = await ctx.db.query("features").collect();
    const contributors = await ctx.db.query("contributors").collect();
    const featureFiles = await ctx.db.query("feature_files").collect();

    // Count features per contributor
    const counts = new Map<string, number>();
    for (const f of features) {
      counts.set(f.contributorId, (counts.get(f.contributorId) || 0) + 1);
    }

    // Sort top contributors
    const sortedContributorIds = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id]) => id);

    const topContributors = await Promise.all(
      sortedContributorIds.map(async (id) => {
        const c = await ctx.db.get(id as any);
        return {
          name: c && "name" in c ? c.name : "Unknown",
          email: c && "email" in c ? c.email : "Unknown",
          featureCount: counts.get(id),
        };
      })
    );

    return {
      summary: {
        totalCommitsAnalyzed: features.length, // Assuming 1 feature per commit in this logic
        totalContributors: contributors.length,
        totalFilesChanged: featureFiles.length,
      },
      topContributors,
      recentFeatures: features.slice(0, 5).map((f) => ({
        title: f.title,
        hash: f.hash,
        timestamp: new Date(f.timestamp).toISOString(),
      })),
    };
  },
});