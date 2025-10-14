import * as SplashScreen from 'expo-splash-screen';

export async function showSplash() {
  await SplashScreen.preventAutoHideAsync();
}

export async function hideSplash() {
  await SplashScreen.hideAsync();
}
