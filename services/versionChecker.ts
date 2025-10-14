import Constants from 'expo-constants';
import * as Updates from 'expo-updates';

export async function checkForUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) await Updates.fetchUpdateAsync();
  } catch (e) {
    console.error('Update check failed', e);
  }
}

export function getAppVersion() {
  return Constants.manifest?.version || '1.0.0';
}
