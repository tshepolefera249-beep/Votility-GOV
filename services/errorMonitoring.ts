import * as Sentry from '@sentry/react-native';

export function initErrorMonitoring() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableAutoSessionTracking: true,
    debug: __DEV__,
  });
}

export function captureError(error: Error, context?: any) {
  Sentry.captureException(error, { extra: context });
}
