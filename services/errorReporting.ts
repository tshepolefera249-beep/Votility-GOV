import * as Sentry from '@sentry/react-native';

export function initErrorReporting() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: true,
    debug: true
  });
}

export function captureError(error: any, context?: any) {
  Sentry.captureException(error, { extra: context });
}
