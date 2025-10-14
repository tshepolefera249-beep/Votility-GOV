import { sendNotification } from './notifications';

export async function notifyElectionStart(electionName: string) {
  await sendNotification(
    'Election Started',
    `The election "${electionName}" has now started. Cast your vote!`
  );
}

export async function notifyElectionEnd(electionName: string) {
  await sendNotification(
    'Election Ended',
    `The election "${electionName}" has ended. Thank you for participating!`
  );
}
