export function calculateEngagementScore(user: any) {
  let score = 0;
  score += user.votesCast || 0;
  score += (user.referals || 0) * 2;
  score += (user.achievements?.length || 0) * 3;
  if(user.dailyActive) score += 1;
  return score;
}
