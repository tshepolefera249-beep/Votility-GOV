import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function getLeaderboard(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const counts: Record<string, number> = {};

  snap.docs.forEach(doc => {
    const vote = doc.data();
    if (vote.electionId === electionId) {
      counts[vote.vote] = (counts[vote.vote] || 0) + 1;
    }
  });

  const leaderboard = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([candidate, votes]) => ({ candidate, votes }));

  return leaderboard;
}
export function generateLeaderboard(votes: Record<string, number>) {
  return Object.entries(votes)
    .sort(([, a], [, b]) => b - a)
    .map(([candidate, count], index) => ({ rank: index + 1, candidate, count }));
}
