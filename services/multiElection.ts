import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function getElectionsVotedByUser(userId: string) {
  const q = query(collection(db, 'votes'), where('userId','==',userId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => doc.data().electionId);
}
