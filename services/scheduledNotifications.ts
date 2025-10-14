import { scheduleLocalNotification } from './localNotifications';

export function scheduleElectionReminder(electionName: string, triggerInSeconds: number) {
  scheduleLocalNotification(
    'Election Reminder',
    `Voting for ${electionName} starts soon!`,
    triggerInSeconds
  );
}
