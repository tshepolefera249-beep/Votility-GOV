import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { calculatePercentages } from './resultPercentage';

export async function checkElectionIntegrity(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);
  
  const candidateCounts: Record<string, number> = {};
  votes.forEach(v => candidateCounts[v.candidateId] = (candidateCounts[v.candidateId] || 0) + 1);

  const percentages = calculatePercentages(candidateCounts);
  const totalVotes = votes.length;

  return { totalVotes, percentages, candidateCounts };
}
