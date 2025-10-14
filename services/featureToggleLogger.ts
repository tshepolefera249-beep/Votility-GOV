import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function logFeatureToggle(adminId: string, featureKey: string, enabled: boolean) {
  await addDoc(collection(db, 'featureToggles'), {
    adminId,
    featureKey,
    enabled,
    timestamp: Timestamp.now()
  });
}
