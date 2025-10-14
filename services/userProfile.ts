import { db } from '@/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function getUserProfile(userId: string) {
  const snap = await getDoc(doc(db, 'users', userId));
  return snap.exists() ? snap.data() : null;
}

export async function updateUserProfile(userId: string, data: any) {
  await updateDoc(doc(db, 'users', userId), data);
}
