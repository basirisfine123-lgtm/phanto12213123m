import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ArrowUpDown, BadgeCheck } from 'lucide-react';
import { Token, trendingTokens, formatPrice, formatChange } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface SwapPageProps {
  username: string;
  onProfileClick: () => void;
}

export function SwapPage({ username, onProfileClick }: SwapPageProps) {
  const [payAmount, setPayAmount] = useState('0');
  const [receiveAmount, setReceiveAmount] = useState('0');
  const [payToken] = useState({ symbol: 'SOL', balance: 16.11428, icon: '◎' });
  const [receiveToken] = useState({ symbol: 'USDC', balance: 0, icon: '💲' });

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
          <span className="text-xl font-semibold text-foreground">Swap</span>
        </div>
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <SlidersHorizontal size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Swap Card */}
      <div className="px-4 space-y-2">
        {/* You Pay */}
        <div className="p-4 rounded-2xl bg-card">
          <div className="text-sm text-muted-foreground mb-2">You Pay</div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="bg-transparent text-4xl font-semibold text-foreground outline-none w-1/2"
              placeholder="0"
            />
            <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary hover:bg-muted transition-colors">
              <span className="text-lg">{payToken.icon}</span>
              <span className="font-semibold text-orange-400">{payToken.symbol}</span>
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button className="text-sm text-primary">↻</button>
            <span className="text-sm text-muted-foreground">{payToken.balance} {payToken.symbol}</span>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-4 z-10 relative">
          <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
            <ArrowUpDown size={18} className="text-primary-foreground" />
          </button>
        </div>

        {/* You Receive */}
        <div className="p-4 rounded-2xl bg-card">
          <div className="text-sm text-muted-foreground mb-2">You Receive</div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={receiveAmount}
              onChange={(e) => setReceiveAmount(e.target.value)}
              className="bg-transparent text-4xl font-semibold text-foreground outline-none w-1/2"
              placeholder="0"
            />
            <button className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary hover:bg-muted transition-colors">
              <span className="text-lg">💲</span>
              <span className="font-semibold text-foreground">{receiveToken.symbol}</span>
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xs">$</span>
            </div>
            <span className="text-sm text-muted-foreground">{receiveToken.balance} {receiveToken.symbol}</span>
          </div>
        </div>
      </div>

      {/* Trending Tokens */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Trending Tokens</h2>
            <span className="text-sm text-muted-foreground">24h Rank ↑</span>
          </div>
          <button className="p-2 rounded-full bg-secondary">
            <SlidersHorizontal size={16} className="text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-2">
          {trendingTokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/50 transition-all"
            >
              <div className="relative">
                <div className={cn(
                  "token-avatar text-lg",
                  token.avatarBg
                )}>
                  {token.avatar.length <= 2 ? token.avatar : token.avatar.slice(0, 2)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs">
                  $
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground">{token.name}</span>
                  {token.verified && (
                    <BadgeCheck size={14} className="text-primary fill-primary" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{token.marketCap}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">{formatPrice(token.price)}</div>
                <div className={cn(
                  "text-sm font-medium",
                  token.change24h >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {formatChange(token.change24h)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
