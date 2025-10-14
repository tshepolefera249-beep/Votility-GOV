import { sendThemedNotification } from './userNotifications';

export async function broadcastNotification(title: string, body: string, tokens: string[]) {
  for(const token of tokens){
    await sendThemedNotification(title, body, token);
  }
}
