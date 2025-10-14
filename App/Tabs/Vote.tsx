import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { CheckCircle2, Circle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { parties, Party } from '@/mocks/parties';
import { useAuth } from '@/contexts/AuthContext';

export default function VoteScreen() {
  const { user, hasVoted, vote } = useAuth();
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleVote = async () => {
    if (!selectedParty) {
      Alert.alert('No Selection', 'Please select a party to vote for');
      return;
    }

    Alert.alert(
      'Confirm Your Vote',
      'Are you sure you want to submit your vote? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          style: 'default',
          onPress: async () => {
            setIsSubmitting(true);
            try {
              await vote(selectedParty);
              Alert.alert(
                'Vote Submitted',
                'Your vote has been recorded successfully. Thank you for participating in democracy!',
                [{ text: 'OK' }]
              );
            } catch {
              Alert.alert('Error', 'Failed to submit vote. Please try again.');
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

  const renderPartyCard = (party: Party) => {
    const isSelected = selectedParty === party.id;

    return (
      <TouchableOpacity
        key={party.id}
        style={[styles.partyCard, isSelected && styles.partyCardSelected]}
        onPress={() => !hasVoted && setSelectedParty(party.id)}
        disabled={hasVoted}
        activeOpacity={0.7}
      >
        <View style={styles.partyHeader}>
          <View style={[styles.partyLogo, { backgroundColor: party.color }]}>
            <Text style={styles.partyLogoText}>{party.logo}</Text>
          </View>
          {isSelected ? (
            <CheckCircle2 size={28} color={Colors.primary} />
          ) : (
            <Circle size={28} color={Colors.grey} />
          )}
        </View>
        <Text style={styles.partyAbbreviation}>{party.abbreviation}</Text>
        <Text style={styles.partyName}>{party.name}</Text>
      </TouchableOpacity>
    );
  };

  if (!user?.isVerified) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>Verification Required</Text>
          <Text style={styles.messageText}>
            Please verify your identity to access the voting ballot.
          </Text>
        </View>
      </View>
    );
  }

  if (hasVoted) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <View style={styles.successIcon}>
            <CheckCircle2 size={64} color={Colors.success} />
          </View>
          <Text style={styles.messageTitle}>Vote Submitted</Text>
          <Text style={styles.messageText}>
            Thank you for participating in the 2025 National Elections. Your vote has
            been recorded and will be counted.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cast Your Vote</Text>
        <Text style={styles.headerSubtitle}>
          Select the party you wish to vote for
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ballotGrid}>
          {parties.map((party) => renderPartyCard(party))}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedParty || isSubmitting) && styles.submitButtonDisabled,
          ]}
          onPress={handleVote}
          disabled={!selectedParty || isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting Vote...' : 'Submit Vote'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Your vote is confidential and secure. Once submitted, it cannot be changed.
        </Text>
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
    fontSize: 14,
    color: Colors.grey,
  },
  scrollContent: {
    padding: 16,
  },
  ballotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  partyCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  partyCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.lightGrey,
  },
  partyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  partyLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partyLogoText: {
    fontSize: 24,
  },
  partyAbbreviation: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 4,
  },
  partyName: {
    fontSize: 12,
    color: Colors.grey,
    lineHeight: 16,
  },
  submitButton: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.white,
  },
  disclaimer: {
    fontSize: 12,
    color: Colors.grey,
    textAlign: 'center',
    lineHeight: 18,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successIcon: {
    marginBottom: 24,
  },
  messageTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
    lineHeight: 24,
  },
});
