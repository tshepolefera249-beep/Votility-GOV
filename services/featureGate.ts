import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function isFeatureAccessible(userId: string, featureKey: string) {
  const ref = doc(db, 'config', 'featureFlags');
  const snap = await getDoc(ref);
  if(!snap.exists()) return false;
  const data = snap.data();
  if(data[featureKey] === true) return true;
  if(typeof data[`${featureKey}_rollout`] === 'number') {
    const hash = [...userId].reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return (hash % 100) < data[`${featureKey}_rollout`];
  }
  return false;
}
