import { captureError } from './errorReporting';

export function logError(error: any, context?: any) {
  console.error('Error caught:', error, context);
  captureError(error, context);
}
