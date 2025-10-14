// infra/redisQueue.ts
import { Queue, Worker, QueueScheduler } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL!);
export const mainQueue = new Queue('votility-tasks', { connection });
export const scheduler = new QueueScheduler('votility-tasks', { connection });

export function startWorker() {
  const worker = new Worker(
    'votility-tasks',
    async (job) => {
      console.log('Processing job', job.name, job.id);
      // Implement job handlers here
      if (job.name === 'tallyVotes') {
        // do heavy tallying here
      }
    },
    { connection }
  );
  worker.on('failed', (job, err) => console.error(`Job ${job.id} failed:`, err));
}
