import { captureError } from './globalErrorLogger';

export async function reportError(error: any, context: Record<string, any> = {}) {
  console.error('Reporting error:', error, context);
  captureError(error, context);
}
