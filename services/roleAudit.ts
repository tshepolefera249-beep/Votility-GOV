import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logRoleChange(adminId: string, userId: string, newRole: string) {
  await addDoc(collection(db, 'roleChanges'), {
    adminId,
    userId,
    newRole,
    timestamp: Timestamp.now()
  });
}
