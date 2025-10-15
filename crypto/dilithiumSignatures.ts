// crypto/dilithiumSignatures.ts
import { dilithium2 } from '@stablelib/dilithium';
import { randomBytes } from 'crypto';

export function generateSignatureKeys() {
  const keyPair = dilithium2.generateKeyPair();
  return { publicKey: keyPair.publicKey, privateKey: keyPair.secretKey };
}

export function signMessage(privateKey: Uint8Array, message: string) {
  return dilithium2.sign(privateKey, Buffer.from(message, 'utf8'));
}

export function verifySignature(publicKey: Uint8Array, message: string, signature: Uint8Array) {
  return dilithium2.verify(publicKey, Buffer.from(message, 'utf8'), signature);
}
