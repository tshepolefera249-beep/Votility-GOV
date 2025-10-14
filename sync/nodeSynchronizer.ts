// sync/nodeSynchronizer.ts
import axios from 'axios';
import crypto from 'crypto';

const NODE_LIST = process.env.NODE_LIST?.split(',') || [];

export async function syncNodeData(data: any) {
  const payload = {
    data,
    timestamp: Date.now(),
    hash: crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex'),
  };
  for (const node of NODE_LIST) {
    try {
      await axios.post(`${node}/sync`, payload);
      console.log(`Synced with node: ${node}`);
    } catch (err) {
      console.warn(`⚠️ Node sync failed: ${node}`);
    }
  }
}
