import { subscribeToCriticalEvents } from './realtimeAlerts';
import { sendBulkNotification } from './adminBroadcast';

export function monitorCriticalEvents() {
  subscribeToCriticalEvents(async (event) => {
    if(event.severity === 'high') {
      await sendBulkNotification('system', `Critical Event: ${event.title}`, event.message, event.userTokens || []);
    }
  });
}
