import { backupVotes } from './backupVotes';
import cron from 'node-cron';

// Runs daily at 02:00 AM server time
cron.schedule('0 2 * * *', async () => {
  const backupPath = await backupVotes();
  console.log('Daily backup completed at', backupPath);
});
