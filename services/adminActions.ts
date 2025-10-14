import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function logAdminAction(adminId: string, action: string, tier: 'low' | 'medium' | 'high') {
  await addDoc(collection(db, 'adminActions'), { adminId, action, tier, timestamp: serverTimestamp() });
}
