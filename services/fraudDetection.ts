import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export async function detectDuplicateVotes(userId: string) {
  const q = query(collection(db, 'votes'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.size > 1; // true if duplicate
}
