// telemetry/metrics.ts
import os from 'os';
import { Gauge, Registry, collectDefaultMetrics } from 'prom-client';

export const registry = new Registry();
collectDefaultMetrics({ register: registry });

export const cpuGauge = new Gauge({ name: 'system_cpu', help: 'CPU load', registers: [registry] });
export const memGauge = new Gauge({ name: 'system_mem', help: 'Memory usage', registers: [registry] });

export function collectMetrics() {
  const load = os.loadavg()[0];
  const memUsed = (os.totalmem() - os.freemem()) / os.totalmem();
  cpuGauge.set(load);
  memGauge.set(memUsed);
}

export function startTelemetry(intervalMs = 5000) {
  setInterval(collectMetrics, intervalMs);
  console.log('[Telemetry] Metrics collection started');
}
