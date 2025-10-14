import { db } from '@/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function detectVotingAnomalies(electionId: string, threshold = 10) {
  const votesRef = collection(db, 'votes');
  const q = query(votesRef, where('electionId', '==', electionId));
  const snap = await getDocs(q);
  const votes = snap.docs.map(d => d.data());

  const deviceMap: Record<string, number> = {};
  votes.forEach(v => {
    deviceMap[v.deviceId] = (deviceMap[v.deviceId] || 0) + 1;
  });

  const anomalies = Object.entries(deviceMap)
    .filter(([_, count]) => count > threshold)
    .map(([deviceId]) => deviceId);

  return anomalies; // List of suspicious device IDs
}
