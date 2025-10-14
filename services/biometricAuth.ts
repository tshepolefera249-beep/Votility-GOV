import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateBiometric() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return false;
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) return false;
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate to log in',
    fallbackLabel: 'Enter PIN'
  });
  return result.success;
}
