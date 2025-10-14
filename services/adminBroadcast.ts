import { broadcastNotification } from './broadcastNotifications';

export async function sendBulkNotification(adminId: string, title: string, body: string, userTokens: string[]) {
  console.log(`Admin ${adminId} sending bulk notification to ${userTokens.length} users`);
  await broadcastNotification(title, body, userTokens);
}
