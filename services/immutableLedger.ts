import { db } from '@/firebaseConfig';
import { collection, doc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

export async function appendVoteToLedger(vote: any) {
  const snap = await getDocs(collection(db, 'voteLedger'));
  const lastHash = snap.docs.length ? snap.docs[snap.docs.length-1].data().hash : '';
  const voteString = JSON.stringify(vote) + lastHash;
  const hash = CryptoJS.SHA256(voteString).toString();

  const ledgerRef = doc(db, 'voteLedger', `${vote.userId}_${vote.electionId}_${Date.now()}`);
  await setDoc(ledgerRef, { ...vote, hash, timestamp: serverTimestamp() });
  return hash;
}
