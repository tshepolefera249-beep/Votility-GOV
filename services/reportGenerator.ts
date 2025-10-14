import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { writeFileSync } from 'fs';
import { Parser } from 'json2csv';

export async function generateCSVReport(collectionName: string, filePath: string) {
  const snap = await getDocs(collection(db, collectionName));
  const data = snap.docs.map(d => d.data());
  const parser = new Parser();
  const csv = parser.parse(data);
  writeFileSync(filePath, csv);
}
