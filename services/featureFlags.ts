import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function isFeatureEnabled(featureKey: string, userId?: string) {
  const snap = await getDoc(doc(db, 'featureFlags', featureKey));
  if (!snap.exists()) return false;
  const data = snap.data();
  if (userId && data.users && data.users.includes(userId)) return true;
  return data.enabled;
}
