// services/chaosInjectorAdvanced.ts
// Run in staging only. Programmatically inject latency, errors, or instance restarts (simulation).
export function injectLatency(msMin = 50, msMax = 1000) {
  const ms = Math.floor(Math.random() * (msMax - msMin + 1)) + msMin;
  return new Promise((res) => setTimeout(res, ms));
}

export function injectError(probability = 0.05) {
  if (Math.random() < probability) throw new Error('ChaosInjectedError');
}

export function simulateNodeDrop(nodes: any[], dropPct = 20) {
  const toDrop = Math.ceil((dropPct / 100) * nodes.length);
  const shuffled = nodes.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(toDrop).map(n => ({ ...n, alive: true }));
}
