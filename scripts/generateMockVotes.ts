import { db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export async function generateMockVotes(electionId: string, numVotes: number) {
  for (let i = 0; i < numVotes; i++) {
    await addDoc(collection(db, 'votes'), {
      electionId,
      userId: `mockUser${i}`,
      vote: `candidate${i % 5}`,
      createdAt: new Date().toISOString()
    });
  }
  console.log(`${numVotes} mock votes added.`);
}
