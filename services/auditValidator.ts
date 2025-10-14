import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function validateAuditTrail() {
  const snap = await getDocs(collection(db, 'auditLogs'));
  const invalidEntries = snap.docs.filter(d => !d.data().timestamp || !d.data().userId);
  return invalidEntries;
}
