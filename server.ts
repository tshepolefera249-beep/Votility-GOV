import { startQueueWorker } from './queue/smartQueue';
startQueueWorker();
import { startTelemetry } from './telemetry/metrics';
startTelemetry();
