import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function canUserVote(userId: string, electionId: string) {
  const voteRef = doc(db, 'votes', `${userId}_${electionId}`);
  const snap = await getDoc(voteRef);
  return !snap.exists(); // true if user hasn’t voted yet
}
