import { db } from '@/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getDeviceFingerprint } from './deviceFingerprint';

export async function logSession(userId: string, action: string) {
  await addDoc(collection(db, 'sessions'), {
    userId,
    action,
    deviceId: getDeviceFingerprint(),
    timestamp: Timestamp.now()
  });
}
