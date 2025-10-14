import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function submitFeedback(userId: string, message: string, screenshot?: string) {
  await addDoc(collection(db, 'feedback'), {
    userId,
    message,
    screenshot: screenshot || null,
    timestamp: Timestamp.now()
  });
}
