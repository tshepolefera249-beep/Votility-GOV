import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logFeatureUsage(adminId: string, featureKey: string) {
  await addDoc(collection(db, 'featureUsage'), {
    adminId,
    featureKey,
    timestamp: Timestamp.now()
  });
}
