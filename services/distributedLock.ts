import { db } from '@/firebaseConfig';
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

export async function acquireLock(resourceId: string, userId: string, ttlMs = 5000) {
  const lockRef = doc(db, 'locks', resourceId);
  const snap = await getDoc(lockRef);
  const now = Date.now();

  if (!snap.exists() || (snap.data()?.expiresAt < now)) {
    await setDoc(lockRef, { userId, expiresAt: now + ttlMs, timestamp: serverTimestamp() });
    return true;
  }
  return false;
}

export async function releaseLock(resourceId: string) {
  const lockRef = doc(db, 'locks', resourceId);
  await deleteDoc(lockRef);
}
