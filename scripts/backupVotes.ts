import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import fs from 'fs';
import path from 'path';

export async function backupVotes() {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data());
  const backupPath = path.resolve(__dirname, `../backups/votes_${Date.now()}.json`);
  fs.writeFileSync(backupPath, JSON.stringify(votes, null, 2));
  console.log('Backup completed:', backupPath);
  return backupPath;
}
