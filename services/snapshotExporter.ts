import { db } from '@/firebaseConfig';
import { collection, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore';

export async function snapshotElection(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);

  const snapshotRef = doc(db, 'snapshots', electionId);
  await setDoc(snapshotRef, { votes, createdAt: serverTimestamp() });
}
