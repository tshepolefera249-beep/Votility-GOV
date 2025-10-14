import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDeviceFingerprint } from './deviceFingerprint';

export async function isVoteFromNewDevice(userId: string) {
  const fingerprint = getDeviceFingerprint();
  const q = query(collection(db, 'votes'), where('userId','==',userId));
  const snap = await getDocs(q);
  const devices = snap.docs.map(d => d.data().deviceId);
  return !devices.includes(fingerprint);
}
