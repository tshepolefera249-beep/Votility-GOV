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
