import { scheduleLocalNotification } from './scheduledNotifications';

export function scheduleDailyVoteReminder(userId: string) {
  // Example: schedule for 10am local time
  const now = new Date();
  const next10AM = new Date();
  next10AM.setHours(10,0,0,0);
  if (now > next10AM) next10AM.setDate(next10AM.getDate() + 1);
  const secondsUntil = (next10AM.getTime() - now.getTime()) / 1000;

  scheduleLocalNotification('Daily Voting Reminder', 'Remember to cast your vote today!', secondsUntil);
}
