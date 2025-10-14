import { db } from '@/firebaseConfig';
import { collection, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import * as Crypto from 'expo-crypto';

export async function castVote(userId: string, electionId: string, candidateId: string) {
  const userVoteRef = doc(db, 'votes', `${userId}_${electionId}`);
  const existing = await getDoc(userVoteRef);
  if (existing.exists()) throw new Error('You already voted!');

  const encryptedVote = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, candidateId);
  await setDoc(userVoteRef, {
    userId,
    electionId,
    vote: encryptedVote,
    createdAt: Timestamp.now(),
  });
}
