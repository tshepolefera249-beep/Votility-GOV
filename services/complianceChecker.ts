import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function checkVotingCompliance(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);

  const invalidVotes = votes.filter(v => !v.userId.match(/^\d{13}$/)); // SA ID check
  return { totalVotes: votes.length, invalidVotes: invalidVotes.length };
}
