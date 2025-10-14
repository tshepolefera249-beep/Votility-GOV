import { db } from '@/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function logSystemLoad(cpu: number, memory: number) {
  await addDoc(collection(db, 'systemLoad'), { cpu, memory, timestamp: serverTimestamp() });
}
