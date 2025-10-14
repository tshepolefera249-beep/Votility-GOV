import { db } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export async function banUser(userId: string, reason: string) {
  const ref = doc(db, 'users', userId);
  await updateDoc(ref, { banned: true, banReason: reason });
}
