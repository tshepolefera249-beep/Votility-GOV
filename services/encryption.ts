import * as Crypto from 'expo-crypto';
import CryptoJS from 'crypto-js';

export function encryptVote(vote: string, key: string) {
  return CryptoJS.AES.encrypt(vote, key).toString();
}

export function decryptVote(cipher: string, key: string) {
  const bytes = CryptoJS.AES.decrypt(cipher, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
