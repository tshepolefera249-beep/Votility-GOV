// services/formalSpecStub.ts
// Hook to run a model-checker step (placeholder). You'd run TLA+ or Alloy outside Node and consume results.
// This file provides a local command runner stub.
import { exec } from 'child_process';
export function runModelChecker(specPath: string): Promise<string> {
  return new Promise((res, rej) => {
    exec(`tla2tools -mc ${specPath}`, (err, stdout, stderr) => {
      if (err) return rej(stderr || err.message);
      res(stdout);
    });
  });
}
