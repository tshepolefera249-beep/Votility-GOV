// queue/smartQueue.ts
import { Queue, Worker, QueueScheduler } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL!);

export const voteQueue = new Queue('vote-tasks', { connection });
export const scheduler = new QueueScheduler('vote-tasks', { connection });

// Worker to process jobs
export function startQueueWorker() {
  const worker = new Worker(
    'vote-tasks',
    async (job) => {
      console.log(`[Queue] Processing job ${job.id} - ${job.name}`);
      switch (job.name) {
        case 'tallyVote':
          console.log('Tallying vote', job.data);
          break;
        case 'sendNotification':
          console.log('Sending notification', job.data);
          break;
      }
    },
    { connection }
  );

  worker.on('failed', (job, err) => {
    console.error(`[Queue] Job failed ${job.id}:`, err);
  });

  console.log('[Queue] Worker running...');
}
