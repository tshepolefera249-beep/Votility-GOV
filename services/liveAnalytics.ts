import { db } from '@/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

export function subscribeToLiveVotes(electionId: string, callback: (stats: any) => void) {
  const votesRef = collection(db, 'votes');
  return onSnapshot(votesRef, snap => {
    const filtered = snap.docs.map(d => d.data()).filter(v => v.electionId === electionId);
    const totalVotes = filtered.length;
    const stats: Record<string, number> = {};
    filtered.forEach(v => {
      stats[v.vote] = (stats[v.vote] || 0) + 1;
    });
    callback({ totalVotes, stats });
  });
}
import { db } from '@/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';

export function subscribeToLiveVotes(callback: (votes: any[]) => void) {
  const votesRef = collection(db, 'votes');
  const q = query(votesRef);
  return onSnapshot(q, snapshot => {
    const data = snapshot.docs.map(doc => doc.data());
    callback(data);
  });
}
