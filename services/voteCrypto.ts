import CryptoJS from 'crypto-js';

export function encryptVote(vote: string, key: string) {
  return CryptoJS.AES.encrypt(vote, key).toString();
}

export function decryptVote(encrypted: string, key: string) {
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
