import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function logSensitiveAction(userId: string, action: string, context: any = {}) {
  await addDoc(collection(db, 'sensitiveActions'), { userId, action, context, timestamp: serverTimestamp() });
}
