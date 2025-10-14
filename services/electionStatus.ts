import { db } from '@/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export async function toggleElectionStatus(electionId: string, active: boolean) {
  const ref = doc(db, 'elections', electionId);
  await updateDoc(ref, { active });
}
