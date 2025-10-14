import * as Notifications from 'expo-notifications';

export async function scheduleLocalNotification(title: string, body: string, triggerInSeconds: number) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, sound: 'default' },
    trigger: { seconds: triggerInSeconds },
  });
}
