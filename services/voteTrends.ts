import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function getVoteTrends(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);

  const trends: Record<string, { [date: string]: number }> = {};
  votes.forEach(v => {
    const date = new Date(v.timestamp.seconds * 1000).toDateString();
    if (!trends[v.vote]) trends[v.vote] = {};
    trends[v.vote][date] = (trends[v.vote][date] || 0) + 1;
  });

  return trends;
}
