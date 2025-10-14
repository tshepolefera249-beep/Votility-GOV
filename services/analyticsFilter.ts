export function filterVotesByDate(votes: any[], startDate: Date, endDate: Date) {
  return votes.filter(v => {
    const voteDate = new Date(v.timestamp.seconds * 1000);
    return voteDate >= startDate && voteDate <= endDate;
  });
}
