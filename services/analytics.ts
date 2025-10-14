import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function getVoteCountsByRegion(electionId: string) {
  const votesSnap = await getDocs(collection(db, 'votes'));
  const regionCounts: Record<string, Record<string, number>> = {};

  votesSnap.docs.forEach(doc => {
    const vote = doc.data();
    if (vote.electionId !== electionId) return;
    const region = vote.region || 'Unknown';
    const candidate = vote.vote;
    if (!regionCounts[region]) regionCounts[region] = {};
    regionCounts[region][candidate] = (regionCounts[region][candidate] || 0) + 1;
  });

  return regionCounts;
}
