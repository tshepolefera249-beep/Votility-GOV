// sync/encryptedNodeMessaging.ts
import crypto from 'crypto';
import axios from 'axios';

const NODES = process.env.NODE_LIST?.split(',') || [];
const SYMM_KEY = Buffer.from(process.env.SYMM_KEY || crypto.randomBytes(32).toString('hex'), 'hex');

export function encryptMessage(data: object) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', SYMM_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);
  return { iv: iv.toString('hex'), data: encrypted.toString('hex') };
}

export function decryptMessage(enc: { iv: string; data: string }) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', SYMM_KEY, Buffer.from(enc.iv, 'hex'));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(enc.data, 'hex')), decipher.final()]);
  return JSON.parse(decrypted.toString('utf8'));
}

export async function broadcastToNodes(payload: object) {
  const encPayload = encryptMessage(payload);
  for (const node of NODES) {
    try {
      await axios.post(`${node}/sync`, encPayload);
      console.log(`[Node Sync] Broadcasted to ${node}`);
    } catch (err) {
      console.warn(`[Node Sync] Failed to reach ${node}`);
    }
  }
}
