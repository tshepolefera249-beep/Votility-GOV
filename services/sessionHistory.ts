import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logUserSession(userId: string, action: string) {
  await addDoc(collection(db, 'sessionHistory'), {
    userId,
    action,
    timestamp: Timestamp.now()
  });
}
