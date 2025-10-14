import * as Sentry from '@sentry/react-native';
Sentry.init({ dsn: 'YOUR_SENTRY_DSN' });
export default Sentry.wrap(App);
import analytics from '@react-native-firebase/analytics';
await analytics().logEvent('app_open', {});
import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
