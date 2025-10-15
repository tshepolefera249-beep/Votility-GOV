// crypto/kyberEncryption.ts
import { kyber512 } from '@stablelib/kyber';
import { randomBytes } from 'crypto';

export function generateKeys() {
  const keyPair = kyber512.generateKeyPair();
  return {
    publicKey: keyPair.publicKey,
    privateKey: keyPair.secretKey,
  };
}

export function encryptMessage(publicKey: Uint8Array, message: string) {
  const plaintext = Buffer.from(message, 'utf8');
  return kyber512.encrypt(publicKey, plaintext);
}

export function decryptMessage(secretKey: Uint8Array, ciphertext: Uint8Array) {
  return Buffer.from(kyber512.decrypt(secretKey, ciphertext)).toString('utf8');
}
