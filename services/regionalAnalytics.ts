import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function aggregateRegionalVotes() {
  const snap = await getDocs(collection(db, 'votes'));
  const regionMap: Record<string, number> = {};

  snap.docs.forEach(d => {
    const region = d.data().region || 'Unknown';
    regionMap[region] = (regionMap[region] || 0) + 1;
  });

  return regionMap;
}
