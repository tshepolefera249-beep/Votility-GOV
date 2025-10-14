import { db } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export async function overrideVote(userId: string, electionId: string, newVote: string) {
  const voteRef = doc(db, 'votes', `${userId}_${electionId}`);
  await updateDoc(voteRef, { vote: newVote, overriddenByAdmin: true, overriddenAt: new Date().toISOString() });
}
