// services/differentialPrivacy.ts
// Add Laplace noise to counts for privacy-preserving aggregate reports.
export function laplaceNoise(scale = 1): number {
  const u = Math.random() - 0.5;
  return -scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
}

export function noisyCount(count: number, epsilon = 1.0): number {
  // scale = 1/epsilon for Laplace mechanism
  const scale = 1 / epsilon;
  const noisy = Math.max(0, Math.round(count + laplaceNoise(scale)));
  return noisy;
}
