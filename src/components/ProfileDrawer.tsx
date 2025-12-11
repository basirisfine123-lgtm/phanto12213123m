import { X, User, Settings, Pencil } from 'lucide-react';
import { Account, formatBalance } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';
import { useState } from 'react';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  followers: number;
  cashBalance: number;
  accounts: Account[];
  onUpdateUsername: (name: string) => void;
  onUpdateAccount: (id: string, updates: Partial<Account>) => void;
  onAddAccount: () => void;
  onSelectAccount: (id: string) => void;
  selectedAccountId: string;
}

export function ProfileDrawer({
  isOpen,
  onClose,
  username,
  followers,
  cashBalance,
  accounts,
  onUpdateUsername,
  onUpdateAccount,
  onAddAccount,
  onSelectAccount,
  selectedAccountId,
}: ProfileDrawerProps) {
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditAccount = (account: Account) => {
    setEditingAccountId(account.id);
    setEditValue(account.name);
  };

  const handleSaveEdit = () => {
    if (editingAccountId && editValue.trim()) {
      onUpdateAccount(editingAccountId, { name: editValue.trim() });
    }
    setEditingAccountId(null);
    setEditValue('');
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-50 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 top-0 bottom-0 z-50 flex items-start justify-center pt-12 px-4">
        <div className="w-full max-w-sm bg-drawer rounded-3xl overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">{username}</div>
                <div className="text-sm text-muted-foreground">{followers} followers</div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-4 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary hover:bg-muted transition-colors">
              <User size={18} className="text-muted-foreground" />
              <span className="text-muted-foreground font-medium">Profile</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary hover:bg-muted transition-colors">
              <Settings size={18} className="text-muted-foreground" />
              <span className="text-muted-foreground font-medium">Settings</span>
            </button>
          </div>

          {/* Cash Balance */}
          <div className="px-4 py-3 bg-secondary/50 mx-4 rounded-xl mb-4">
            <div className="text-sm text-muted-foreground">Cash Balance</div>
            <div className="text-xl font-bold text-primary">${cashBalance.toFixed(2)}</div>
          </div>

          {/* Accounts */}
          <div className="px-4 pb-4">
            <h3 className="text-lg font-semibold text-foreground mb-3">Your Accounts</h3>
            <div className="space-y-2">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  onClick={() => onSelectAccount(account.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer",
                    selectedAccountId === account.id 
                      ? "bg-secondary ring-1 ring-primary/30" 
                      : "bg-card hover:bg-muted/50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-foreground",
                    account.avatarBg
                  )}>
                    {account.avatar}
                  </div>
                  <div className="flex-1">
                    {editingAccountId === account.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                        className="bg-transparent border-b border-primary outline-none text-foreground font-medium w-full"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-foreground">{account.name}</span>
                        {account.verified && (
                          <BadgeCheck size={14} className="text-primary fill-primary" />
                        )}
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground">
                      {formatBalance(account.balance)}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAccount(account);
                    }}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Pencil size={16} className="text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Account Button */}
          <div className="px-4 pb-6">
            <button
              onClick={onAddAccount}
              className="w-full py-4 rounded-2xl bg-primary/20 text-primary font-semibold hover:bg-primary/30 transition-colors"
            >
              Add Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
