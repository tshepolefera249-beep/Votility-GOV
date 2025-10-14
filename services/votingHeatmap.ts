export function generateVotingHeatmap(votes: any[]) {
  const heatmap: Record<string, number> = {};
  votes.forEach(v => {
    const date = new Date(v.timestamp.seconds * 1000).toDateString();
    heatmap[date] = (heatmap[date] || 0) + 1;
  });
  return heatmap;
}
