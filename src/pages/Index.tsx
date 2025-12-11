import { useState, useMemo } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { ProfileDrawer } from '@/components/ProfileDrawer';
import { HomePage } from '@/components/pages/HomePage';
import { SwapPage } from '@/components/pages/SwapPage';
import { DiscoverPage } from '@/components/pages/DiscoverPage';
import { CashPage } from '@/components/pages/CashPage';
import { ChatsPage } from '@/components/pages/ChatsPage';
import { useWalletStore } from '@/hooks/useWalletStore';
import { Account } from '@/lib/mockData';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const wallet = useWalletStore();

  const totalBalance = useMemo(() => wallet.getTotalBalance(), [wallet]);
  const change24h = useMemo(() => {
    return wallet.userTokens.reduce((sum, token) => {
      return sum + (token.change24h * (token.balanceUsd || 0) / 100);
    }, 0);
  }, [wallet.userTokens]);
  
  const changePercent = useMemo(() => {
    if (totalBalance === 0) return 0;
    return (change24h / (totalBalance - change24h)) * 100;
  }, [totalBalance, change24h]);

  const handleAddAccount = () => {
    const newId = `account-${Date.now()}`;
    const newAccount: Account = {
      id: newId,
      name: `Account ${wallet.accounts.length + 1}`,
      balance: 0,
      avatar: `A${wallet.accounts.length + 1}`,
      avatarBg: 'bg-gray-600',
    };
    wallet.addAccount(newAccount);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            username={wallet.username}
            totalBalance={totalBalance}
            change24h={Math.abs(change24h)}
            changePercent={Math.abs(changePercent)}
            cashBalance={wallet.cashBalance}
            tokens={wallet.userTokens}
            onProfileClick={() => setIsProfileOpen(true)}
            onTokenClick={() => {}}
          />
        );
      case 'swap':
        return (
          <SwapPage
            username={wallet.username}
            onProfileClick={() => setIsProfileOpen(true)}
          />
        );
      case 'discover':
        return <DiscoverPage />;
      case 'cash':
        return (
          <CashPage
            username={wallet.username}
            cashBalance={wallet.cashBalance}
            onProfileClick={() => setIsProfileOpen(true)}
          />
        );
      case 'chats':
        return (
          <ChatsPage
            username={wallet.username}
            onProfileClick={() => setIsProfileOpen(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      {renderPage()}
      
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        username={wallet.username}
        followers={wallet.followers}
        cashBalance={wallet.cashBalance}
        accounts={wallet.accounts}
        onUpdateUsername={wallet.updateUsername}
        onUpdateAccount={wallet.updateAccount}
        onAddAccount={handleAddAccount}
        onSelectAccount={wallet.selectAccount}
        selectedAccountId={wallet.selectedAccountId}
      />
    </div>
  );
};

export default Index;
