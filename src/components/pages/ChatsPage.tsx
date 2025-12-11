import { ChevronRight, Users, BadgeCheck } from 'lucide-react';
import { chatItems, recentChats } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface ChatsPageProps {
  username: string;
  onProfileClick: () => void;
}

export function ChatsPage({ username, onProfileClick }: ChatsPageProps) {
  return (
    <div className="min-h-screen bg-background pb-24 animate-fade-in">
      {/* Header */}
      <div className="p-4 flex items-center gap-2">
        <button onClick={onProfileClick}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-sm">🔥</span>
          </div>
        </button>
        <span className="font-medium text-muted-foreground">{username}</span>
      </div>

      <div className="px-4">
        <h1 className="text-2xl font-bold text-foreground mb-6">Chats</h1>

        {/* Trending */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Trending</h2>
          <div className="space-y-2">
            {chatItems.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/50 transition-all"
              >
                <div className={cn(
                  "token-avatar text-lg",
                  chat.token.avatarBg
                )}>
                  {chat.token.avatar.length <= 2 ? chat.token.avatar : chat.token.avatar.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-foreground">{chat.token.name}</span>
                  <div className="text-sm text-muted-foreground">{chat.token.marketCap}</div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users size={14} />
                  <span className="text-sm">{chat.participants}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Recent</h2>
          <div className="space-y-2">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-muted/50 transition-all"
              >
                <div className={cn(
                  "token-avatar text-lg",
                  chat.token.avatarBg
                )}>
                  {chat.token.avatar}
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-foreground">{chat.token.name}</span>
                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {chat.lastMessage}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users size={14} />
                  <span className="text-sm">{chat.participants}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
