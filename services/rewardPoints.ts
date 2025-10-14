import { db } from '@/firebaseConfig';
import { doc, updateDoc, increment } from 'firebase/firestore';

export async function addRewardPoints(userId: string, points: number) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { rewardPoints: increment(points) });
}
