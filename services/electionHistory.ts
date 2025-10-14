import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getUserElectionHistory(userId: string) {
  const q = query(collection(db, 'votes'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data());
}
