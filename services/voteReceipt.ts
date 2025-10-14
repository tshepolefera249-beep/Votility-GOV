import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

export async function generateVoteReceipt(voteData: any) {
  const json = JSON.stringify(voteData);
  const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, json);
  await AsyncStorage.setItem(`voteReceipt_${voteData.electionId}`, hash);
  return hash;
}

export async function verifyVoteReceipt(electionId: string, voteData: any) {
  const storedHash = await AsyncStorage.getItem(`voteReceipt_${electionId}`);
  const json = JSON.stringify(voteData);
  const newHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, json);
  return storedHash === newHash;
}
import CryptoJS from 'crypto-js';

export function generateVoteReceipt(userId: string, electionId: string, candidateId: string) {
  const raw = `${userId}-${electionId}-${candidateId}-${Date.now()}`;
  return CryptoJS.SHA256(raw).toString();
}

export function verifyVoteReceipt(receipt: string, knownHashes: string[]) {
  return knownHashes.includes(receipt);
}
