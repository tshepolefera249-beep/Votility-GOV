import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logAdminAction(adminId: string, action: string, details?: any) {
  await addDoc(collection(db, 'auditLogs'), {
    adminId,
    action,
    details: details || {},
    timestamp: Timestamp.now()
  });
}
