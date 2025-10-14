import CryptoJS from 'crypto-js';

export function decryptVote(encryptedVote: string, key: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedVote, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
