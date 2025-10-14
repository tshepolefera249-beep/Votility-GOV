export function calculatePercentages(votes: Record<string, number>) {
  const total = Object.values(votes).reduce((sum, val) => sum + val, 0);
  const percentages: Record<string, number> = {};
  Object.entries(votes).forEach(([candidate, count]) => {
    percentages[candidate] = total > 0 ? Math.round((count / total) * 100) : 0;
  });
  return percentages;
}
