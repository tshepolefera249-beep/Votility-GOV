import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setSessionToken(token: string, expiresInMinutes: number) {
  const expiry = Date.now() + expiresInMinutes * 60 * 1000;
  await AsyncStorage.setItem('sessionToken', JSON.stringify({ token, expiry }));
}

export async function getSessionToken(): Promise<string | null> {
  const data = await AsyncStorage.getItem('sessionToken');
  if (!data) return null;
  const { token, expiry } = JSON.parse(data);
  if (Date.now() > expiry) {
    await AsyncStorage.removeItem('sessionToken');
    return null;
  }
  return token;
}

export async function clearSession() {
  await AsyncStorage.removeItem('sessionToken');
}
