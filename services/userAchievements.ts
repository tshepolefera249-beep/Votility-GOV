import { db } from '@/firebaseConfig';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export async function awardAchievement(userId: string, achievement: string) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { achievements: arrayUnion(achievement) });
}
