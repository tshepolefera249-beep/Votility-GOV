import { db } from '@/firebaseConfig';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

export async function setUserOnline(userId: string) {
  await setDoc(doc(db, 'onlineUsers', userId), { online: true, timestamp: Date.now() });
}

export async function setUserOffline(userId: string) {
  await setDoc(doc(db, 'onlineUsers', userId), { online: false, timestamp: Date.now() });
}

export function subscribeToOnlineUsers(callback: (users: any) => void) {
  return onSnapshot(db.collection('onlineUsers'), snapshot => {
    const data: any = {};
    snapshot.forEach(doc => { data[doc.id] = doc.data(); });
    callback(data);
  });
}
