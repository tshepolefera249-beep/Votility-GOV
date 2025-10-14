import CryptoJS from 'crypto-js';

export function validateVoteSignature(vote: any, signature: string, secret: string) {
  const expected = CryptoJS.HmacSHA256(JSON.stringify(vote), secret).toString();
  return expected === signature;
}
