import { sendThemedNotification } from './userNotifications';

export async function broadcastEmergency(message: string, tokens: string[]) {
  for (const token of tokens) {
    await sendThemedNotification('Emergency Alert', message, token);
  }
}
