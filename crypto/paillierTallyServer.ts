// crypto/paillierTallyServer.ts
import { generateRandomKeys, add, multiply, decrypt } from 'paillier-bigint';

export interface TallyConfig {
  bitLength?: number;
}

export async function initTally(config: TallyConfig = {}) {
  const { publicKey, privateKey } = await generateRandomKeys(config.bitLength || 2048);
  return { publicKey, privateKey };
}

export async function encryptVote(vote: number, publicKey: any) {
  return publicKey.encrypt(BigInt(vote));
}

export async function combineVotes(encryptedVotes: bigint[], publicKey: any) {
  return encryptedVotes.reduce((acc, val) => multiply(acc, val, publicKey.nSquared), BigInt(1));
}

export async function decryptTally(sum: bigint, privateKey: any) {
  return Number(decrypt(sum, privateKey));
}
