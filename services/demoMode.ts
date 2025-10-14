import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function populateDemoElection(electionId: string) {
  const candidates = ['Alice', 'Bob', 'Carol', 'Dave'];
  for (let i = 0; i < 50; i++) {
    const candidate = candidates[i % candidates.length];
    await addDoc(collection(db, 'votes'), {
      electionId,
      userId: `demoUser${i}`,
      vote: candidate,
      createdAt: new Date().toISOString()
    });
  }
  return 'Demo election populated';
}
