import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function detectVotePatterns(userId: string, electionId: string) {
  const q = query(collection(db, 'votes'), where('userId','==',userId));
  const snap = await getDocs(q);
  const votes = snap.docs.map(d => d.data());
  const suspicious = votes.filter(v => v.electionId === electionId).length > 1;
  return suspicious;
}
