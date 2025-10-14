import { db } from '@/firebaseConfig';
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';

export async function trackDailyActiveUser(userId: string) {
  const today = new Date().toDateString();
  const ref = doc(db, 'dau', today);
  await updateDoc(ref, { users: arrayUnion(userId), timestamp: Timestamp.now() });
}
