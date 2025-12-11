import { Clock, Search, QrCode, Send, ArrowLeftRight, DollarSign, ChevronRight, BadgeCheck } from 'lucide-react';
import { Token, formatBalance } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface HomePageProps {
  username: string;
  totalBalance: number;
  change24h: number;
  changePercent: number;
  cashBalance: number;
  tokens: Token[];
  onProfileClick: () => void;
  onTokenClick: (token: Token) => void;
}

export function HomePage({
  username,
  totalBalance,
  change24h,
  changePercent,
  cashBalance,
  tokens,
  onProfileClick,
  onTokenClick,
}: HomePageProps) {
  const isPositive = change24h >= 0;

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
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Clock size={20} className="text-muted-foreground" />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Search size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Balance Section */}
      <div className="px-4 py-6">
        <h1 className="text-4xl font-bold text-foreground">
          ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <span className={cn(
            "font-medium",
            isPositive ? "text-red-400" : "text-red-400"
          )}>
            {isPositive ? '' : '-'}${Math.abs(change24h).toFixed(2)}
          </span>
          <span className={cn(
            "px-2 py-0.5 rounded-md text-sm font-medium",
            isPositive ? "bg-red-500/20 text-red-400" : "bg-red-500/20 text-red-400"
          )}>
            {isPositive ? '' : '-'}{Math.abs(changePercent).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 grid grid-cols-4 gap-3 mb-6">
        <button className="action-button">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <QrCode size={20} className="text-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Receive</span>
        </button>
        <button className="action-button">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <Send size={20} className="text-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Send</span>
        </button>
        <button className="action-button">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeftRight size={20} className="text-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Swap</span>
        </button>
        <button className="action-button">
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <DollarSign size={20} className="text-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">Buy</span>
        </button>
      </div>

      {/* Cash Balance Card */}
      <div className="mx-4 mb-6 p-4 rounded-2xl bg-card flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Cash Balance</div>
          <div className="text-lg font-semibold text-foreground">${cashBalance.toFixed(2)}</div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-secondary text-foreground font-medium hover:bg-muted transition-colors">
          Add Cash
        </button>
      </div>

      {/* Tokens Section */}
      <div className="px-4">
        <button className="flex items-center gap-1 mb-3">
          <h2 className="text-lg font-semibold text-foreground">Tokens</h2>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
        <div className="space-y-2">
          {tokens.map((token) => (
            <button
              key={token.id}
              onClick={() => onTokenClick(token)}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/50 transition-all active:scale-[0.98]"
            >
              <div className={cn(
                "token-avatar text-lg",
                token.avatarBg
              )}>
                {token.avatar}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground">{token.name}</span>
                  {token.verified && (
                    <BadgeCheck size={14} className="text-primary fill-primary" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {token.balance} {token.symbol}
                </span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">
                  ${token.balanceUsd?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  token.change24h >= 0 ? "text-red-400" : "text-red-400"
                )}>
                  -${Math.abs(token.change24h * (token.balanceUsd || 0) / 100).toFixed(2)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Collectibles Section */}
      <div className="px-4 mt-6">
        <button className="flex items-center gap-1 mb-3">
          <h2 className="text-lg font-semibold text-foreground">Collectibles</h2>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square rounded-xl bg-card overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
