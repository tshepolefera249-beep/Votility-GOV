import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export async function isMFARequired(userId: string) {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);
  return snap.exists() && snap.data()?.mfaEnabled === true;
}
