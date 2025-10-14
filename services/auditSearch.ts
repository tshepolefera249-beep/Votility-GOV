import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function searchAuditLogs(field: string, value: string) {
  const q = query(collection(db, 'auditLogs'), where(field, '==', value));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data());
}
