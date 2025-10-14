import React, { Component, ReactNode } from 'react';
import { View, Text, Button } from 'react-native';
import { captureError } from '@/services/errorReporting';

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError(_: Error) { return { hasError: true }; }

  componentDidCatch(error: Error, errorInfo: any) {
    captureError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Something went wrong.</Text>
          <Button title="Reload App" onPress={() => location.reload()} />
        </View>
      );
    }
    return this.props.children;
  }
}
