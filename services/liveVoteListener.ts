import { db } from '@/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

export function subscribeToVote(userId: string, electionId: string, callback: (vote: string) => void) {
  const voteDoc = doc(db, 'votes', `${userId}_${electionId}`);
  const unsubscribe = onSnapshot(voteDoc, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback(data.vote);
    }
  });
  return unsubscribe;
}
