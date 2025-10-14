// crypto/thresholdSignatures.ts
import { generatePrivate, getPublic } from '@noble/ed25519';
import secrets from 'secrets.js-grempe';
import { sign } from '@noble/ed25519';

export interface ThresholdKeySet {
  publicKey: string;
  shares: string[];
}

export async function generateThresholdKeys(total: number, threshold: number): Promise<ThresholdKeySet> {
  const privateKey = Buffer.from(await generatePrivate()).toString('hex');
  const shares = secrets.share(privateKey, total, threshold);
  const publicKey = Buffer.from(await getPublic(Buffer.from(privateKey, 'hex'))).toString('hex');
  return { publicKey, shares };
}

export async function partialSign(message: string, privateShare: string) {
  const pk = secrets.hex2str(privateShare);
  return await sign(Buffer.from(message), Buffer.from(pk, 'hex'));
}
