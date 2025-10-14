import { db } from '@/firebaseConfig';
import { collection, getDocs, setDoc, doc, serverTimestamp } from 'firebase/firestore';

export async function backupCollection(collectionName: string) {
  const snap = await getDocs(collection(db, collectionName));
  const backupRef = collection(db, `backup_${collectionName}_${Date.now()}`);
  for (const d of snap.docs) {
    await setDoc(doc(backupRef), { ...d.data(), backedUpAt: serverTimestamp() });
  }
}
