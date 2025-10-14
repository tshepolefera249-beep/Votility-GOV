import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function logElectionEvent(event: string, severity: 'low'|'medium'|'high') {
  await addDoc(collection(db, 'electionEvents'), { event, severity, timestamp: serverTimestamp() });
}
