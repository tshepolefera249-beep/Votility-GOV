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
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export async function queueVoteOffline(vote) {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    const pending = JSON.parse(await AsyncStorage.getItem('pendingVotes') || '[]');
    pending.push(vote);
    await AsyncStorage.setItem('pendingVotes', JSON.stringify(pending));
  } else {
    await castVote(vote.userId, vote.electionId, vote.candidateId);
  }
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '@/firebaseConfig';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import * as Crypto from 'expo-crypto';

export async function castVoteWithConfirmation(userId: string, electionId: string, candidateId: string) {
  const voteRef = doc(db, 'votes', `${userId}_${electionId}`);
  const existing = await getDoc(voteRef);
  if (existing.exists()) throw new Error('You already voted!');

  const encryptedVote = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, candidateId);
  await setDoc(voteRef, { userId, electionId, vote: encryptedVote, createdAt: Timestamp.now() });

  // Save receipt locally
  await AsyncStorage.setItem(`voteReceipt_${electionId}`, JSON.stringify({ candidateId, timestamp: new Date().toISOString() }));

  return 'Vote successfully submitted!';
}
