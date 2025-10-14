import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function logMetric(event: string, data: Record<string, any>) {
  await addDoc(collection(db, 'metrics'), { event, data, timestamp: serverTimestamp() });
}
