import { detectDuplicateVotes, detectMultipleDevices } from './fraudDetection';
import { sendNotification } from './notifications';

export async function alertAdminIfFraud(userId: string, electionId: string, deviceId: string) {
  const duplicate = await detectDuplicateVotes(userId, electionId);
  const multiDevice = await detectMultipleDevices(userId, deviceId);

  if (duplicate || multiDevice) {
    await sendNotification(
      'Suspicious Activity Detected',
      `User ${userId} might be attempting multiple votes. Check immediately.`
    );
    return true;
  }
  return false;
}
