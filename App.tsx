import * as Sentry from '@sentry/react-native';
Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
export default Sentry.wrap(App);
import analytics from '@react-native-firebase/analytics';
await analytics().logEvent('app_open', {});
