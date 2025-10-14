import { scheduleLocalNotification } from './scheduledNotifications';

export function scheduleInactivityReminder(userId: string, daysInactive: number) {
  const secondsUntilReminder = daysInactive * 24 * 3600;
  scheduleLocalNotification(
    'We miss you!',
    'Come back and vote in the latest election!',
    secondsUntilReminder
  );
}
