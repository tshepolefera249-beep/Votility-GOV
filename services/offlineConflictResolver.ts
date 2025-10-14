import { submitVote } from './voteSubmission';

export async function resolveOfflineConflicts(votes: any[], encryptionKey: string) {
  const uniqueVotes: Record<string, any> = {};
  votes.forEach(v => {
    uniqueVotes[v.electionId] = v; // keep last vote per election
  });
  for(const vote of Object.values(uniqueVotes)) {
    await submitVote(vote.userId, vote.electionId, vote.candidateId, encryptionKey);
  }
}
