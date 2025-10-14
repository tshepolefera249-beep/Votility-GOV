import { clearSession } from './sessionManager';

let timeoutId: NodeJS.Timeout;

export function startInactivityTimer(minutes: number) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(async () => {
    await clearSession();
    console.log('User logged out due to inactivity');
  }, minutes * 60 * 1000);
}

export function resetInactivityTimer(minutes: number) {
  startInactivityTimer(minutes);
}
