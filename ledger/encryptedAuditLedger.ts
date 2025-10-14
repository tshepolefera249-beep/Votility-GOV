// ledger/encryptedAuditLedger.ts
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const ledgerPath = path.resolve('./data/audit-ledger.json');
const AES_KEY = crypto.scryptSync(process.env.LEDGER_SECRET || 'super-secret', 'salt', 32);

function encryptData(data: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', AES_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
  return { iv: iv.toString('hex'), data: encrypted.toString('hex') };
}

function decryptData(enc: { iv: string; data: string }) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', AES_KEY, Buffer.from(enc.iv, 'hex'));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(enc.data, 'hex')),
    decipher.final()
  ]);
  return decrypted.toString('utf8');
}

export function appendAuditLog(entry: any) {
  const logs = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, 'utf8')) : [];
  const previousHash = logs.length ? logs[logs.length - 1].hash : '0';
  const dataString = JSON.stringify(entry);
  const encrypted = encryptData(dataString);
  const hash = crypto.createHash('sha256').update(previousHash + dataString).digest('hex');
  logs.push({ encrypted, hash, timestamp: new Date().toISOString() });
  fs.writeFileSync(ledgerPath, JSON.stringify(logs, null, 2));
}

export function verifyLedger() {
  const logs = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  for (let i = 1; i < logs.length; i++) {
    const prevHash = logs[i - 1].hash;
    const decrypted = decryptData(logs[i].encrypted);
    const recomputed = crypto.createHash('sha256').update(prevHash + decrypted).digest('hex');
    if (recomputed !== logs[i].hash) throw new Error(`Ledger tampering detected at index ${i}`);
  }
  console.log('Ledger verified: all entries intact.');
}
