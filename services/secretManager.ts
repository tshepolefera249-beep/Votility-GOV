// services/secretManager.ts
// Simple wrapper to use environment KMS providers. Replace stubs with actual SDK calls.
import fs from 'fs';
import path from 'path';

export async function getSecret(name: string): Promise<string> {
  // In prod, use AWS Secrets Manager / GCP Secret Manager / Azure Key Vault SDKs.
  // For local dev, read from a secure file path (not checked into git).
  const localPath = process.env.LOCAL_SECRET_DIR ? path.join(process.env.LOCAL_SECRET_DIR, name) : null;
  if (localPath && fs.existsSync(localPath)) return fs.readFileSync(localPath, 'utf8').trim();
  const env = process.env[name];
  if (env) return env;
  throw new Error(`Secret ${name} not found`);
}

export async function rotateSecret(name: string, newValue: string): Promise<void> {
  // Hook to call real KMS rotation API in production; here we write to local file for dev.
  const localDir = process.env.LOCAL_SECRET_DIR;
  if (!localDir) throw new Error('Secret rotation requires LOCAL_SECRET_DIR in dev mode');
  const p = path.join(localDir, name);
  fs.writeFileSync(p, newValue, { mode: 0o600 });
}
