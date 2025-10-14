import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export async function registerForPushNotifications() {
  if (!Constants.isDevice) return;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') return;

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Push token:', token);
  return token;
}

// Send a simple local notification
export async function sendNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null
  });
}
