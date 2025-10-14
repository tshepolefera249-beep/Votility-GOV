import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logSystemAlert(type: string, message: string) {
  await addDoc(collection(db, 'systemAlerts'), {
    type,
    message,
    timestamp: Timestamp.now()
  });
}
