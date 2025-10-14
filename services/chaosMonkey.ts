// Very small chaos testing tool you can run in staging to simulate node failures
import { randomInt } from 'crypto';

export function randomlyKillNodes(nodes: any[], killPct = 20) {
  const toKill = Math.ceil((killPct / 100) * nodes.length);
  const shuffled = nodes.slice().sort(() => Math.random() - 0.5);
  const killed = shuffled.slice(0, toKill).map(n => ({ ...n, alive: false }));
  const surviving = shuffled.slice(toKill).map(n => ({ ...n, alive: true }));
  return [...killed, ...surviving];
}

export function injectLatency(msMin = 50, msMax = 500) {
  const ms = randomInt(msMin, msMax);
  return new Promise(res => setTimeout(res, ms));
}
