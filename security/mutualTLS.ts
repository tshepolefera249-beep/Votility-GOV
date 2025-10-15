// security/mutualTLS.ts
import fs from 'fs';
import https from 'https';
import express, { Request, Response } from 'express';

export function createMTLSServer(app: express.Express) {
  const options = {
    key: fs.readFileSync(process.env.TLS_KEY!),
    cert: fs.readFileSync(process.env.TLS_CERT!),
    ca: fs.readFileSync(process.env.TLS_CA!), // trusted client certs
    requestCert: true,
    rejectUnauthorized: true, // only allow trusted clients
  };

  return https.createServer(options, app);
}
