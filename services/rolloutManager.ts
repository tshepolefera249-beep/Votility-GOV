import { db } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export async function toggleFeature(featureKey: string, enabled: boolean, percentage?: number) {
  const ref = doc(db, 'config', 'featureFlags');
  await updateDoc(ref, {
    [featureKey]: enabled,
    [`${featureKey}_rollout`]: percentage || 100
  });
}
