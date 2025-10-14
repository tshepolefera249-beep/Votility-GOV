// analytics/logIntelligence.ts
import fs from 'fs';
import crypto from 'crypto';

export function analyzeLogs(file: string) {
  const lines = fs.readFileSync(file, 'utf8').split('\n').filter(Boolean);
  const stats: Record<string, number> = {};
  lines.forEach(line => {
    const key = crypto.createHash('md5').update(line.split(' ')[0]).digest('hex').slice(0, 6);
    stats[key] = (stats[key] || 0) + 1;
  });
  const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  console.log('🧩 Log intelligence summary:');
  console.table(sorted.slice(0, 10));
}
