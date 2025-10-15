// recovery/disasterRecovery.ts
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = './data/votes.db';
const BACKUP_DIR = './data/backups';

export function createBackup() {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const backupName = `backup_${Date.now()}.db`;
  const backupPath = path.join(BACKUP_DIR, backupName);
  fs.copyFileSync(DB_PATH, backupPath);
  console.log(`[Recovery] Backup created: ${backupName}`);
  return backupPath;
}

export function verifyBackup(backupPath: string) {
  const data = fs.readFileSync(backupPath);
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  console.log(`[Recovery] Backup hash: ${hash}`);
  return hash;
}

export function restoreBackup(backupPath: string) {
  fs.copyFileSync(backupPath, DB_PATH);
  console.log('[Recovery] Backup restored successfully');
}
