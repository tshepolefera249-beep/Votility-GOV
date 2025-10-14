import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function scanForFraudPatterns(electionId: string) {
  const snap = await getDocs(collection(db, 'votes'));
  const votes = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);

  // Example heuristic: multiple votes in <1 sec or same IP multiple accounts
  const suspiciousUsers: Set<string> = new Set();
  const ipMap: Record<string, number> = {};
  votes.forEach(v => {
    const ip = v.ipAddress;
    ipMap[ip] = (ipMap[ip] || 0) + 1;
    if(ipMap[ip] > 3) suspiciousUsers.add(v.userId);
  });

  return Array.from(suspiciousUsers);
}
