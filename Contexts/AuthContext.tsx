import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback, useMemo } from 'react';

export interface User {
  id: string;
  name: string;
  idNumber: string;
  dateOfBirth: string;
  address: string;
  phone?: string;
  email?: string;
  isVerified: boolean;
  hasVoted: boolean;
  votingHistory: VotingHistory[];
}

export interface VotingHistory {
  electionId: string;
  electionName: string;
  date: string;
  voted: boolean;
}

const STORAGE_KEY = '@votility_user';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const signUp = useCallback(async (data: {
    name: string;
    idNumber: string;
    dateOfBirth: string;
    address: string;
  }) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...data,
      isVerified: false,
      hasVoted: false,
      votingHistory: [],
    };
    await saveUser(newUser);
    return newUser;
  }, []);

  const verify = useCallback(async (method: 'phone' | 'email', value: string, code?: string) => {
    if (!user) return false;

    const updatedUser: User = {
      ...user,
      isVerified: true,
      ...(method === 'phone' ? { phone: value } : { email: value }),
    };
    await saveUser(updatedUser);
    return true;
  }, [user]);

  const vote = useCallback(async (partyId: string) => {
    if (!user || !user.isVerified || user.hasVoted) return false;

    const updatedUser: User = {
      ...user,
      hasVoted: true,
      votingHistory: [
        ...user.votingHistory,
        {
          electionId: '2025-national',
          electionName: 'National Elections 2025',
          date: new Date().toISOString(),
          voted: true,
        },
      ],
    };
    await saveUser(updatedUser);
    return true;
  }, [user]);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }, []);

  return useMemo(() => ({
    user,
    isLoading,
    signUp,
    verify,
    vote,
    logout,
    isAuthenticated: !!user,
    isVerified: user?.isVerified || false,
    hasVoted: user?.hasVoted || false,
  }), [user, isLoading, signUp, verify, vote, logout]);
});
