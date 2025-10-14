import { encryptVote } from './voteCrypto';
import { db } from '@/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { retryAsync } from './retryService';
import { getDeviceFingerprint } from './deviceFingerprint';

export async function submitVote(userId: string, electionId: string, candidateId: string, encryptionKey: string) {
  const deviceId = getDeviceFingerprint();
  const votePayload = encryptVote(candidateId, encryptionKey);
  const voteDocId = `${userId}_${electionId}`;
  
  return retryAsync(async () => {
    await setDoc(doc(db, 'votes', voteDocId), {
      userId,
      electionId,
      candidateId: votePayload,
      deviceId,
      timestamp: serverTimestamp()
    });
  });
}
