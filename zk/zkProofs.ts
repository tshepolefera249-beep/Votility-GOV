// zk/zkProofs.ts
import { groth16 } from 'snarkjs';
import fs from 'fs';
import path from 'path';

export async function generateProof(circuitName: string, input: any) {
  const wasmPath = path.resolve(`./zk/${circuitName}.wasm`);
  const zkeyPath = path.resolve(`./zk/${circuitName}.zkey`);
  const { proof, publicSignals } = await groth16.fullProve(input, wasmPath, zkeyPath);
  return { proof, publicSignals };
}

export async function verifyProof(circuitName: string, proof: any, publicSignals: any) {
  const vkey = JSON.parse(fs.readFileSync(`./zk/${circuitName}_verification_key.json`, 'utf8'));
  const res = await groth16.verify(vkey, publicSignals, proof);
  return res; // true or false
}
