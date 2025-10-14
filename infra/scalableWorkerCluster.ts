// infra/scalableWorkerCluster.ts
import cluster from 'cluster';
import os from 'os';

export function startCluster(startFn: () => void) {
  const numCPUs = os.cpus().length;
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} running with ${numCPUs} workers`);
    for (let i = 0; i < numCPUs; i++) cluster.fork();
    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died — restarting`);
      cluster.fork();
    });
  } else {
    startFn();
  }
}
