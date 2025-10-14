import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';
import fs from 'fs';

export async function exportEncryptedVotes(electionId: string, encryptionKey: string, path: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(votes), encryptionKey).toString();
  fs.writeFileSync(path, encrypted);
}
