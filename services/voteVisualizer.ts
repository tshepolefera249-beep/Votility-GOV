import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function visualizeVotePatterns(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);

  const candidateMap: Record<string, number> = {};
  votes.forEach(v => candidateMap[v.candidateId] = (candidateMap[v.candidateId] || 0) + 1);

  return Object.entries(candidateMap).map(([candidate, count]) => ({ candidate, count }));
}
