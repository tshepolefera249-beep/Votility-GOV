import { db } from '@/firebaseConfig';
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';

export async function addCandidate(electionId: string, candidate: any) {
  const ref = collection(db, 'candidates');
  await addDoc(ref, { ...candidate, electionId });
}

export async function updateCandidate(candidateId: string, data: any) {
  const ref = doc(db, 'candidates', candidateId);
  await updateDoc(ref, data);
}

export async function deleteCandidate(candidateId: string) {
  await deleteDoc(doc(db, 'candidates', candidateId));
}

export async function getCandidatesByElection(electionId: string) {
  const snap = await getDocs(collection(db, 'candidates'));
  return snap.docs.map(d => d.data()).filter(c => c.electionId === electionId);
}
