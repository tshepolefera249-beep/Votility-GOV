import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Colors from '@/constants/colors';
import { nationalResults, provincialResults, RegionResults } from '@/mocks/results';



type FilterType = 'National' | 'Gauteng' | 'Western Cape' | 'KwaZulu-Natal';

export default function ResultsScreen() {
  const [filter, setFilter] = useState<FilterType>('National');

  const getCurrentResults = (): RegionResults => {
    if (filter === 'National') return nationalResults;
    return provincialResults.find((r) => r.region === filter) || nationalResults;
  };

  const results = getCurrentResults();

  const renderBarChart = () => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Vote Distribution</Text>
        {results.results.map((result) => (
          <View key={result.partyId} style={styles.barRow}>
            <Text style={styles.barLabel}>{result.abbreviation}</Text>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${result.percentage}%`,
                    backgroundColor: result.color,
                  },
                ]}
              />
            </View>
            <Text style={styles.barPercentage}>{result.percentage}%</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderPieChart = () => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Vote Share</Text>
        <View style={styles.pieChartContainer}>
          <View style={styles.pieLegend}>
            {results.results.map((result) => (
              <View key={result.partyId} style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: result.color }]}
                />
                <Text style={styles.legendText}>
                  {result.abbreviation} - {result.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Election Results</Text>
        <Text style={styles.headerSubtitle}>
          Last updated:{' '}
          {new Date(results.lastUpdated).toLocaleString('en-ZA', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {(['National', 'Gauteng', 'Western Cape', 'KwaZulu-Natal'] as FilterType[]).map(
          (region) => (
            <TouchableOpacity
              key={region}
              style={[
                styles.filterButton,
                filter === region && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(region)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === region && styles.filterTextActive,
                ]}
              >
                {region}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsCard}>
          <Text style={styles.statsLabel}>Total Votes Cast</Text>
          <Text style={styles.statsValue}>
            {results.totalVotes.toLocaleString('en-ZA')}
          </Text>
        </View>

        {renderBarChart()}
        {renderPieChart()}

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Detailed Results</Text>
          {results.results.map((result) => (
            <View key={result.partyId} style={styles.detailCard}>
              <View style={styles.detailHeader}>
                <View
                  style={[styles.detailColor, { backgroundColor: result.color }]}
                />
                <View style={styles.detailInfo}>
                  <Text style={styles.detailParty}>{result.partyName}</Text>
                  <Text style={styles.detailAbbreviation}>
                    {result.abbreviation}
                  </Text>
                </View>
              </View>
              <View style={styles.detailStats}>
                <Text style={styles.detailVotes}>
                  {result.votes.toLocaleString('en-ZA')} votes
                </Text>
                <Text style={styles.detailPercentage}>{result.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.grey,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.grey,
  },
  filterTextActive: {
    color: Colors.white,
  },
  scrollContent: {
    padding: 16,
  },
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsLabel: {
    fontSize: 14,
    color: Colors.grey,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  chartContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 16,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  barLabel: {
    width: 50,
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.black,
  },
  barContainer: {
    flex: 1,
    height: 24,
    backgroundColor: Colors.lightGrey,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  bar: {
    height: '100%',
    borderRadius: 12,
  },
  barPercentage: {
    width: 50,
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.black,
    textAlign: 'right',
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  pieLegend: {
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: Colors.black,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 16,
  },
  detailCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailColor: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  detailInfo: {
    flex: 1,
  },
  detailParty: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.black,
    marginBottom: 2,
  },
  detailAbbreviation: {
    fontSize: 12,
    color: Colors.grey,
  },
  detailStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailVotes: {
    fontSize: 14,
    color: Colors.grey,
  },
  detailPercentage: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
});
