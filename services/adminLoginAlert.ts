import { sendThemedNotification } from './userNotifications';

export async function alertOnAdminLogin(adminId: string, timestamp: Date) {
  const message = `Admin ${adminId} logged in at ${timestamp.toLocaleString()}`;
  // Replace with actual admin notification tokens
  const adminTokens = ['EXPO_PUSH_TOKEN_1', 'EXPO_PUSH_TOKEN_2'];
  for (const token of adminTokens) {
    await sendThemedNotification('Admin Login Alert', message, token);
  }
}
