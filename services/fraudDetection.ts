import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export async function detectDuplicateVotes(userId: string) {
  const q = query(collection(db, 'votes'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.size > 1; // true if duplicate
}
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

// Detect duplicate voting
export async function detectDuplicateVotes(userId: string, electionId: string) {
  const q = query(collection(db, 'votes'), where('userId', '==', userId));
  const snap = await getDocs(q);
  const count = snap.docs.filter(d => d.data().electionId === electionId).length;
  return count > 1; // true if duplicate
}

// Detect multiple devices
export async function detectMultipleDevices(userId: string, deviceId: string) {
  const q = query(collection(db, 'votes'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.some(d => d.data().deviceId && d.data().deviceId !== deviceId);
}
