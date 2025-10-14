import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logSecurityBreach(userId: string, action: string) {
  await addDoc(collection(db, 'securityAlerts'), {
    userId,
    action,
    timestamp: Timestamp.now()
  });
}
