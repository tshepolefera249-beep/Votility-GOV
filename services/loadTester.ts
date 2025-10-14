// services/loadTester.ts
// Small harness to generate concurrent HTTP requests (use against staging only)
import fetch from 'node-fetch';

export async function rampLoad(url: string, concurrency = 50, durationMs = 30_000) {
  const end = Date.now() + durationMs;
  const workers: Promise<any>[] = [];
  for (let i = 0; i < concurrency; i++) {
    workers.push((async () => {
      while (Date.now() < end) {
        const start = Date.now();
        try {
          const res = await fetch(url, { method: 'GET' });
          await res.text();
        } catch (e) {
          // capture errors to logs in your harness
        }
        const elapsed = Date.now() - start;
        // small jitter
        await new Promise(r => setTimeout(r, Math.max(10, 200 - elapsed)));
      }
    })());
  }
  await Promise.all(workers);
}
