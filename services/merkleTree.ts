// Simple Merkle tree helper (JS). For production use use a battle-tested library.
import CryptoJS from 'crypto-js';

export function hash(data: string) {
  return CryptoJS.SHA256(data).toString();
}

export function buildMerkleRoot(leaves: string[]): string {
  if (leaves.length === 0) return '';
  let layer = leaves.map(l => hash(l));
  while (layer.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = (i + 1 < layer.length) ? layer[i + 1] : left;
      next.push(hash(left + right));
    }
    layer = next;
  }
  return layer[0];
}

export function getMerkleProof(leaves: string[], idx: number): string[] {
  const proofs: string[] = [];
  let layer = leaves.map(l => hash(l));
  let index = idx;
  while (layer.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = (i + 1 < layer.length) ? layer[i + 1] : left;
      next.push(hash(left + right));
      if (i === index || i + 1 === index) {
        const sibling = (i === index) ? right : left;
        proofs.push(sibling);
        index = Math.floor(i / 2);
      }
    }
    layer = next;
  }
  return proofs;
}

export function verifyMerkleProof(leaf: string, proof: string[], root: string, idx: number): boolean {
  let computed = hash(leaf);
  let index = idx;
  for (const sibling of proof) {
    if (index % 2 === 0) computed = hash(computed + sibling);
    else computed = hash(sibling + computed);
    index = Math.floor(index / 2);
  }
  return computed === root;
}
