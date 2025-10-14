import { setMaintenanceMode } from './maintenanceMode';

export function scheduleMaintenance(startTime: Date, endTime: Date) {
  const now = new Date();
  const startDelay = startTime.getTime() - now.getTime();
  const endDelay = endTime.getTime() - now.getTime();

  setTimeout(() => setMaintenanceMode(true), startDelay);
  setTimeout(() => setMaintenanceMode(false), endDelay);
}
