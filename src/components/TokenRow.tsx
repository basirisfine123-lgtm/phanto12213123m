import { Token, formatPrice, formatChange } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { BadgeCheck } from 'lucide-react';

interface TokenRowProps {
  token: Token;
  rank?: number;
  showBalance?: boolean;
  onClick?: () => void;
}

export function TokenRow({ token, rank, showBalance, onClick }: TokenRowProps) {
  const isPositive = token.change24h >= 0;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/50 transition-all duration-200 active:scale-[0.98]"
    >
      <div className="relative">
        {rank && (
          <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center text-xs font-semibold border border-border">
            {rank}
          </span>
        )}
        <div className={cn(
          "token-avatar text-lg",
          token.avatarBg
        )}>
          {token.avatar.length <= 2 ? token.avatar : token.avatar.slice(0, 2)}
        </div>
      </div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-foreground">{token.name}</span>
          {token.verified && (
            <BadgeCheck size={14} className="text-primary fill-primary" />
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {token.marketCap || token.volume}
          {token.leverage && ` · ${token.leverage}`}
        </span>
      </div>
      
      <div className="text-right">
        <div className="font-semibold text-foreground">
          {showBalance && token.balanceUsd 
            ? `$${token.balanceUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            : formatPrice(token.price)
          }
        </div>
        <div className={cn(
          "text-sm font-medium",
          isPositive ? "text-green-400" : "text-red-400"
        )}>
          {showBalance && token.balance 
            ? `${isPositive ? '' : '-'}$${Math.abs(token.change24h * (token.balanceUsd || 0) / 100).toFixed(2)}`
            : formatChange(token.change24h)
          }
        </div>
      </div>
    </button>
  );
}
