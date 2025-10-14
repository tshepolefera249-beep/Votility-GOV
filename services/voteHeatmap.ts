import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function generateVoteHeatmap(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);

  const heatmap: Record<string, number> = {};
  votes.forEach(v => {
    const region = v.region || 'Unknown';
    heatmap[region] = (heatmap[region] || 0) + 1;
  });

  return heatmap;
}
