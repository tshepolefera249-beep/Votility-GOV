// security/intrusionMonitor.ts
import fs from 'fs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const LOG_PATH = './logs/access.log';
const ALERT_THRESHOLD = 10;
let intrusionBuffer: Record<string, number> = {};

async function sendAlert(ip: string, attempts: number) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.ALERT_EMAIL, pass: process.env.ALERT_PASS }
  });
  await transporter.sendMail({
    from: process.env.ALERT_EMAIL,
    to: process.env.SECURITY_ADMIN,
    subject: '🚨 Intrusion Alert: Suspicious Activity Detected',
    text: `IP ${ip} has attempted ${attempts} unauthorized accesses.`,
  });
  console.log(`⚠️ Alert sent for IP: ${ip}`);
}

export function monitorIntrusions() {
  if (!fs.existsSync(LOG_PATH)) fs.writeFileSync(LOG_PATH, '');
  fs.watchFile(LOG_PATH, () => {
    const log = fs.readFileSync(LOG_PATH, 'utf8').split('\n');
    log.forEach(line => {
      const ip = line.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
      if (ip) {
        const ipStr = ip[0];
        intrusionBuffer[ipStr] = (intrusionBuffer[ipStr] || 0) + 1;
        if (intrusionBuffer[ipStr] > ALERT_THRESHOLD) {
          sendAlert(ipStr, intrusionBuffer[ipStr]);
          intrusionBuffer[ipStr] = 0;
        }
      }
    });
  });
  console.log('🧠 Intrusion monitoring active.');
}
