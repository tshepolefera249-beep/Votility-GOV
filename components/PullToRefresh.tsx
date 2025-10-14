import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

export default function PullToRefresh({ children, onRefresh }: { children: React.ReactNode, onRefresh: () => Promise<void> }) {
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      {children}
    </ScrollView>
  );
}
