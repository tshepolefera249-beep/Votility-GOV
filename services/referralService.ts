import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export async function addReferral(referrerId: string, newUserId: string) {
  await addDoc(collection(db, 'referrals'), { referrerId, newUserId, timestamp: new Date() });
}

export async function getReferrals(referrerId: string) {
  const q = query(collection(db, 'referrals'), where('referrerId', '==', referrerId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data());
}
