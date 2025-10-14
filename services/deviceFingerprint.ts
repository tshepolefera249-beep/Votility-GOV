import * as Device from 'expo-device';
import * as Application from 'expo-application';

export function getDeviceFingerprint() {
  return `${Device.modelName}-${Device.osName}-${Device.osVersion}-${Application.androidId || Application.installationId}`;
}
