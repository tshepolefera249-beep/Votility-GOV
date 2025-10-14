import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logMFAEvent(userId: string, type: string, success: boolean) {
  await addDoc(collection(db, 'mfaEvents'), {
    userId,
    type,
    success,
    timestamp: Timestamp.now()
  });
}
