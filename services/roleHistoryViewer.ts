import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function getRoleChangeHistory(userId: string) {
  const q = query(collection(db, 'roleChanges'), where('userId','==',userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data()).sort((a,b) => b.timestamp.seconds - a.timestamp.seconds);
}
