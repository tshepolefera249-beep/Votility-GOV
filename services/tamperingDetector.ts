import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

export async function detectTampering() {
  const snap = await getDocs(collection(db, 'voteLedger'));
  const anomalies: string[] = [];

  snap.docs.forEach((doc, idx) => {
    if(idx === 0) return;
    const prevHash = snap.docs[idx-1].data().hash;
    const currentVote = doc.data();
    const recalculated = CryptoJS.SHA256(JSON.stringify({...currentVote, hash: undefined}) + prevHash).toString();
    if(recalculated !== currentVote.hash) anomalies.push(doc.id);
  });

  return anomalies;
}
