import * as Crypto from 'expo-crypto';
import CryptoJS from 'crypto-js';

export function encryptVote(vote: string, key: string) {
  return CryptoJS.AES.encrypt(vote, key).toString();
}

export function decryptVote(cipher: string, key: string) {
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
import CryptoJS from 'crypto-js';

// Generate a unique key per election
export function generateElectionKey(electionId: string) {
  return CryptoJS.SHA256(electionId + Date.now().toString()).toString();
}

// Encrypt vote with election key
export function encryptVote(vote: string, key: string) {
  return CryptoJS.AES.encrypt(vote, key).toString();
}

// Decrypt vote
export function decryptVote(cipher: string, key: string) {
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
