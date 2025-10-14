import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import jsPDF from 'jspdf';
import { parse } from 'json2csv';

export async function exportResultsCSV(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);
  const csv = parse(votes);
  const path = `${FileSystem.documentDirectory}results_${electionId}.csv`;
  await FileSystem.writeAsStringAsync(path, csv);
  await Sharing.shareAsync(path);
}

export async function exportResultsPDF(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);
  const doc = new jsPDF();
  doc.text(`Election Results: ${electionId}`, 10, 10);
  votes.forEach((v, i) => doc.text(`${i + 1}. User: ${v.userId}, Vote: ${v.vote}`, 10, 20 + i * 10));
  const path = `${FileSystem.documentDirectory}results_${electionId}.pdf`;
  doc.save(path);
  await Sharing.shareAsync(path);
}
