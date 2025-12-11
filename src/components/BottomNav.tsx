import { Home, Layers, ArrowLeftRight, MessageSquare, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'cash', icon: Layers, label: 'Cash' },
  { id: 'swap', icon: ArrowLeftRight, label: 'Swap' },
  { id: 'chats', icon: MessageSquare, label: 'Chats' },
  { id: 'discover', icon: Search, label: 'Discover' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border safe-bottom z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all duration-200",
                "hover:bg-secondary/50 active:scale-95",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon 
                size={24} 
                className={cn(
                  "transition-all duration-200",
                  isActive && "text-foreground"
                )}
                fill={isActive && item.id === 'home' ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
