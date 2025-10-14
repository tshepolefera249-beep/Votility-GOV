import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUB_KEY = 'pushToken';

export async function registerPushToken() {
  const token = await Notifications.getExpoPushTokenAsync();
  await AsyncStorage.setItem(SUB_KEY, token.data);
  return token.data;
}

export async function getPushToken() {
  return await AsyncStorage.getItem(SUB_KEY);
}
