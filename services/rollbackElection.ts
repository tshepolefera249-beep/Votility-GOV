import { db } from '@/firebaseConfig';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

export async function rollbackElection(electionId: string, snapshotId: string) {
  const snapshotRef = doc(db, 'snapshots', snapshotId);
  const snapData = (await snapshotRef.get()).data();
  if(!snapData) throw new Error('Snapshot not found');

  const votesRef = collection(db, 'votes');
  for(const vote of snapData.votes) {
    const voteDoc = doc(votesRef, `${vote.userId}_${vote.electionId}`);
    await setDoc(voteDoc, vote);
  }
}
