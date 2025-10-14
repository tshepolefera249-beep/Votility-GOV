import Constants from 'expo-constants';
import { Alert, Linking } from 'react-native';

export async function checkAppVersion(latestVersion: string, appStoreUrl: string) {
  const currentVersion = Constants.manifest.version;
  if (currentVersion !== latestVersion) {
    Alert.alert(
      'Update Available',
      'A new version of Votility is available. Please update to continue.',
      [{ text: 'Update', onPress: () => Linking.openURL(appStoreUrl) }]
    );
  }
}
