import { db } from '@/firebaseConfig';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

export async function archiveElection(electionId: string) {
  const ref = doc(db, 'elections', electionId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  await setDoc(doc(db, 'archivedElections', electionId), snap.data());
  await deleteDoc(ref);
}
