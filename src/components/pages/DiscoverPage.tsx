import { useState } from 'react';
import { Search, Plus, ChevronRight, BadgeCheck } from 'lucide-react';
import { Token, trendingTokens, trendingPerps, formatPrice, formatChange } from '@/lib/mockData';
import { cn } from '@/lib/utils';

type TabType = 'tokens' | 'perps' | 'lists';

export function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<TabType>('tokens');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'tokens', label: 'Tokens', icon: '🔥' },
    { id: 'perps', label: 'Trending Perps', icon: '📈' },
    { id: 'lists', label: 'Lists', icon: '🌐' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      {/* Search Bar */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center">
          <span className="text-sm">S</span>
        </div>
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-full bg-card">
          <Search size={18} className="text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sites, tokens, URL"
            className="bg-transparent outline-none text-foreground flex-1"
          />
        </div>
        <button className="p-2 rounded-lg bg-card hover:bg-muted transition-colors">
          <Plus size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 flex gap-2 overflow-x-auto pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-muted"
            )}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Trending Tokens */}
      <div className="px-4">
        <button className="flex items-center gap-1 mb-3">
          <h2 className="text-lg font-semibold text-foreground">Trending Tokens</h2>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
        <div className="space-y-2">
          {trendingTokens.slice(0, 3).map((token, index) => (
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
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center text-xs font-semibold border border-border">
                  {index + 1}
                </span>
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

      {/* Trending Perps */}
      <div className="px-4 mt-6">
        <button className="flex items-center gap-1 mb-3">
          <h2 className="text-lg font-semibold text-foreground">Trending Perps</h2>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
        <div className="space-y-2">
          {trendingPerps.map((token, index) => (
            <div
              key={token.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/50 transition-all"
            >
              <div className="relative">
                <div className={cn(
                  "token-avatar text-lg",
                  token.avatarBg
                )}>
                  {token.avatar}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center text-xs font-semibold border border-border">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <span className="font-semibold text-foreground">{token.name}</span>
                <div className="text-sm text-muted-foreground">
                  {token.volume} · {token.leverage}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">${token.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
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

      {/* Top Lists */}
      <div className="px-4 mt-6">
        <button className="flex items-center gap-1 mb-3">
          <h2 className="text-lg font-semibold text-foreground">Top Lists</h2>
          <ChevronRight size={18} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
