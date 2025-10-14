import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/colors';
import { Smartphone, Mail } from 'lucide-react-native';

type VerificationMethod = 'phone' | 'email';

export default function VerificationScreen() {
  const router = useRouter();
  const { verify } = useAuth();
  const insets = useSafeAreaInsets();
  const [method, setMethod] = useState<VerificationMethod>('phone');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleVerify = async () => {
    if (method === 'phone') {
      if (!phoneNumber || !otp) {
        Alert.alert('Error', 'Please enter phone number and OTP');
        return;
      }
      if (otp.length !== 6) {
        Alert.alert('Error', 'OTP must be 6 digits');
        return;
      }
    } else {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }
      if (password.length < 8) {
        Alert.alert('Error', 'Password must be at least 8 characters');
        return;
      }
    }

    setIsLoading(true);
    try {
      const value = method === 'phone' ? phoneNumber : email;
      const code = method === 'phone' ? otp : password;
      await verify(method, value, code);
      router.replace('/(tabs)/vote');
    } catch {
      Alert.alert('Error', 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/vmhwlrb9f0h19zgdgumn7' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Verify Your Identity</Text>
          <Text style={styles.subtitle}>
            Choose your preferred verification method
          </Text>
        </View>

        <View style={styles.methodSelector}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              method === 'phone' && styles.methodButtonActive,
            ]}
            onPress={() => setMethod('phone')}
          >
            <Smartphone
              size={24}
              color={method === 'phone' ? Colors.primary : Colors.grey}
            />
            <Text
              style={[
                styles.methodText,
                method === 'phone' && styles.methodTextActive,
              ]}
            >
              Phone + OTP
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              method === 'email' && styles.methodButtonActive,
            ]}
            onPress={() => setMethod('email')}
          >
            <Mail
              size={24}
              color={method === 'email' ? Colors.primary : Colors.grey}
            />
            <Text
              style={[
                styles.methodText,
                method === 'email' && styles.methodTextActive,
              ]}
            >
              Email + Password
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {method === 'phone' ? (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="+27 XX XXX XXXX"
                  placeholderTextColor={Colors.grey}
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>OTP Code</Text>
                <TextInput
                  style={styles.input}
                  value={otp}
                  onChangeText={setOtp}
                  placeholder="Enter 6-digit code"
                  placeholderTextColor={Colors.grey}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                <TouchableOpacity style={styles.resendButton}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="your.email@example.com"
                  placeholderTextColor={Colors.grey}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a secure password"
                  placeholderTextColor={Colors.grey}
                  secureTextEntry
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.grey,
    textAlign: 'center',
  },
  methodSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  methodButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.lightGrey,
  },
  methodText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.grey,
  },
  methodTextActive: {
    color: Colors.primary,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.black,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.black,
    backgroundColor: Colors.white,
  },
  resendButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  resendText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  button: {
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.white,
  },
});
