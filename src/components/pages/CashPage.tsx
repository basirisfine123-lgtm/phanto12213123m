import { MoreHorizontal, CreditCard, Building, Banknote, ChevronRight } from 'lucide-react';

interface CashPageProps {
  username: string;
  cashBalance: number;
  onProfileClick: () => void;
}

export function CashPage({ username, cashBalance, onProfileClick }: CashPageProps) {
  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button onClick={onProfileClick} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-sm">🔥</span>
          </div>
          <span className="font-medium text-foreground">{username}</span>
        </button>
        <span className="text-xl font-semibold text-foreground">Cash</span>
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <MoreHorizontal size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Balance Section */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Balance</div>
          <div className="text-4xl font-bold text-foreground">${cashBalance.toFixed(2)}</div>
        </div>
        <div className="w-16 h-10 rounded-lg bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center overflow-hidden">
          <div className="text-xs font-bold text-purple-900">VISA</div>
        </div>
      </div>

      {/* Waitlist Banner */}
      <div className="mx-4 mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-800 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-purple-500/50 flex items-center justify-center">
          <span className="text-2xl">👻</span>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-foreground">Join the waitlist!</div>
          <div className="text-sm text-purple-200">Access to Phantom Card & more coming soon</div>
        </div>
      </div>

      {/* Add Cash Section */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Add cash</h2>

        {/* Quick Sell Crypto */}
        <div className="p-4 rounded-2xl bg-card mb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-lg z-30">💰</div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-lg z-20">💵</div>
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-lg z-10">≋</div>
            </div>
          </div>
          <div className="font-semibold text-foreground">Quick Sell Crypto</div>
          <div className="text-sm text-muted-foreground">Instant · No fees on stablecoins</div>
          <div className="mt-2 text-sm text-primary">$2,192.50 Available</div>
        </div>

        {/* Bank, Card, or Apple Pay */}
        <div className="p-4 rounded-2xl bg-card mb-3 opacity-60">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-1">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Building size={18} className="text-muted-foreground" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <CreditCard size={18} className="text-muted-foreground" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm">
                Pay
              </div>
            </div>
          </div>
          <div className="font-semibold text-muted-foreground">Bank, Card, or Apple Pay</div>
          <div className="text-sm text-muted-foreground">Instant · No fees on bank transfers</div>
          <div className="mt-2 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground" />
            <span className="text-sm text-muted-foreground">Coming Soon</span>
          </div>
        </div>

        {/* Direct Deposit */}
        <div className="p-4 rounded-2xl bg-card opacity-60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
              🇺🇸
            </div>
          </div>
          <div className="font-semibold text-muted-foreground">Direct Deposit</div>
          <div className="text-sm text-muted-foreground">1-3 days · Free</div>
        </div>
      </div>
    </div>
  );
}
