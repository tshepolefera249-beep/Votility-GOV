import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setUserPreference(key: string, value: any) {
  await AsyncStorage.setItem(`pref_${key}`, JSON.stringify(value));
}

export async function getUserPreference(key: string) {
  const val = await AsyncStorage.getItem(`pref_${key}`);
  return val ? JSON.parse(val) : null;
}
