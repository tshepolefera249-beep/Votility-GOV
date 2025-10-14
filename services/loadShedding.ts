import { retryAsync } from './retryService';

let queue: any[] = [];
let processing = false;

export function enqueueHeavyTask(task: () => Promise<any>) {
  queue.push(task);
  processQueue();
}

async function processQueue() {
  if(processing) return;
  processing = true;
  while(queue.length) {
    const task = queue.shift();
    try { await retryAsync(task, 5); }
    catch(e) { console.error('Task failed after retries', e); }
  }
  processing = false;
}
