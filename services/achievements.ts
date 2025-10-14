import { db } from '@/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export async function awardAchievement(userId: string, badge: string) {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { achievements: arrayUnion(badge) });
}
