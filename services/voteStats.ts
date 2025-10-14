import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function getVoteStats(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);
  const totalVotes = votes.length;
  const candidates = Array.from(new Set(votes.map(v => v.vote)));
  const stats: Record<string, number> = {};
  candidates.forEach(c => {
    stats[c] = votes.filter(v => v.vote === c).length;
  });
  return { totalVotes, stats };
}
