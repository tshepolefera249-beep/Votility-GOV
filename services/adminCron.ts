import { scheduleElectionReminder } from './scheduledNotifications';

export function scheduleDailyTasks() {
  setInterval(() => {
    // Example: remind users about upcoming elections
    const elections = [
      { name: 'National Election', secondsUntilStart: 3600 } // placeholder
    ];
    elections.forEach(e => scheduleElectionReminder(e.name, e.secondsUntilStart));
  }, 24 * 60 * 60 * 1000); // every 24h
}
