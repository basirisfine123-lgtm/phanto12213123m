import { useState, useCallback } from 'react';
import { Token, Account, defaultAccounts, userTokens as defaultUserTokens } from '@/lib/mockData';

export interface WalletState {
  username: string;
  followers: number;
  cashBalance: number;
  accounts: Account[];
  userTokens: Token[];
  selectedAccountId: string;
}

const initialState: WalletState = {
  username: '@BlzHavin',
  followers: 0,
  cashBalance: 0.00,
  accounts: defaultAccounts,
  userTokens: defaultUserTokens,
  selectedAccountId: 'solana',
};

export function useWalletStore() {
  const [state, setState] = useState<WalletState>(initialState);

  const updateUsername = useCallback((username: string) => {
    setState(prev => ({ ...prev, username }));
  }, []);

  const updateCashBalance = useCallback((cashBalance: number) => {
    setState(prev => ({ ...prev, cashBalance }));
  }, []);

  const updateAccount = useCallback((accountId: string, updates: Partial<Account>) => {
    setState(prev => ({
      ...prev,
      accounts: prev.accounts.map(acc =>
        acc.id === accountId ? { ...acc, ...updates } : acc
      ),
    }));
  }, []);

  const addAccount = useCallback((account: Account) => {
    setState(prev => ({
      ...prev,
      accounts: [...prev.accounts, account],
    }));
  }, []);

  const updateToken = useCallback((tokenId: string, updates: Partial<Token>) => {
    setState(prev => ({
      ...prev,
      userTokens: prev.userTokens.map(token =>
        token.id === tokenId ? { ...token, ...updates } : token
      ),
    }));
  }, []);

  const selectAccount = useCallback((accountId: string) => {
    setState(prev => ({ ...prev, selectedAccountId: accountId }));
  }, []);

  const getSelectedAccount = useCallback(() => {
    return state.accounts.find(acc => acc.id === state.selectedAccountId) || state.accounts[0];
  }, [state.accounts, state.selectedAccountId]);

  const getTotalBalance = useCallback(() => {
    return state.userTokens.reduce((sum, token) => sum + (token.balanceUsd || 0), 0);
  }, [state.userTokens]);

  return {
    ...state,
    updateUsername,
    updateCashBalance,
    updateAccount,
    addAccount,
    updateToken,
    selectAccount,
    getSelectedAccount,
    getTotalBalance,
  };
}
