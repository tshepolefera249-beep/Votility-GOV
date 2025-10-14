import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function getVoterTurnout(electionId: string) {
  const votesRef = collection(db, 'votes');
  const q = query(votesRef, where('electionId', '==', electionId));
  const snap = await getDocs(q);
  return snap.docs.length;
}
