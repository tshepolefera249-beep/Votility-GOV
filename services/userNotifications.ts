import { sendNotification } from './notifications';
import { isDarkMode } from './darkMode';

export async function sendThemedNotification(title: string, message: string, token?: string) {
  const dark = await isDarkMode();
  const themedTitle = dark ? `🌙 ${title}` : `☀️ ${title}`;
  const themedMessage = dark ? `Dark Mode: ${message}` : message;
  await sendNotification(themedTitle, themedMessage, token);
}
import * as Notifications from 'expo-notifications';

export async function sendThemedNotification(title: string, body: string, token: string) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: 'default' },
    trigger: null
  });
}
