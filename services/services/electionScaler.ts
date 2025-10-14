import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function getVoteLoad(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.filter(d => d.data().electionId === electionId);
  return votes.length;
}

export function decideScalingAction(voteCount: number, thresholds: {scaleUp:number, scaleDown:number}) {
  if(voteCount > thresholds.scaleUp) return 'SCALE_UP';
  if(voteCount < thresholds.scaleDown) return 'SCALE_DOWN';
  return 'STABLE';
}
