import { db } from '@/firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

export async function syncVoteToRegion(vote: any, regionDb: any) {
  const ref = doc(regionDb, 'votes', `${vote.userId}_${vote.electionId}`);
  await setDoc(ref, vote);
}

export async function syncAllRegions(votes: any[], regions: any[]) {
  for(const vote of votes) {
    for(const regionDb of regions) {
      await syncVoteToRegion(vote, regionDb);
    }
  }
}
