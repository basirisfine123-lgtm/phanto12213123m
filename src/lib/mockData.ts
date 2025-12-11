export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap?: string;
  volume?: string;
  leverage?: string;
  avatar: string;
  avatarBg: string;
  verified?: boolean;
  balance?: number;
  balanceUsd?: number;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  avatar: string;
  avatarBg: string;
  verified?: boolean;
}

export interface ChatItem {
  id: string;
  token: Token;
  lastMessage: string;
  participants: number;
}

export const trendingTokens: Token[] = [
  {
    id: 'calvin',
    symbol: 'CALVIN',
    name: 'CALVIN',
    price: 0.00157604,
    change24h: 189.72,
    marketCap: '$1.6M MC',
    avatar: '🔥',
    avatarBg: 'bg-orange-500',
  },
  {
    id: '1649ac',
    symbol: '1649AC',
    name: '1649AC',
    price: 0.00113132,
    change24h: 13563.47,
    marketCap: '$1.1M MC',
    avatar: '1649AC',
    avatarBg: 'bg-yellow-600',
  },
  {
    id: 'digimon',
    symbol: 'DIGIMON',
    name: 'DIGIMON',
    price: 0.00047452,
    change24h: 206.62,
    marketCap: '$474K MC',
    avatar: '🤖',
    avatarBg: 'bg-blue-500',
    verified: true,
  },
  {
    id: 'airbags',
    symbol: 'AIRBAGS',
    name: 'AIRBAGS',
    price: 0.00008275,
    change24h: -13.37,
    marketCap: '$83K MC',
    avatar: '💨',
    avatarBg: 'bg-gray-500',
  },
  {
    id: 'boxabl',
    symbol: 'BOXABL',
    name: 'BOXABL',
    price: 0.00137951,
    change24h: 84.11,
    marketCap: '$1.4M MC',
    avatar: '📦',
    avatarBg: 'bg-green-500',
  },
];

export const trendingPerps: Token[] = [
  {
    id: 'pltr',
    symbol: 'PLTR',
    name: 'PLTR',
    price: 186.84,
    change24h: 2.90,
    volume: '$21M Vol',
    leverage: '10x',
    avatar: '⭕',
    avatarBg: 'bg-gray-700',
  },
  {
    id: 'amzn',
    symbol: 'AMZN',
    name: 'AMZN',
    price: 230.79,
    change24h: 1.20,
    volume: '$6.9M Vol',
    leverage: '10x',
    avatar: 'a',
    avatarBg: 'bg-orange-600',
  },
  {
    id: 'xyz100',
    symbol: 'XYZ100',
    name: 'XYZ100',
    price: 25604.00,
    change24h: -0.29,
    volume: '$150M Vol',
    leverage: '20x',
    avatar: '💯',
    avatarBg: 'bg-red-500',
  },
];

export const userTokens: Token[] = [
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: 136.12,
    change24h: -1.05,
    marketCap: '$76B MC',
    avatar: '◎',
    avatarBg: 'bg-gradient-to-br from-purple-500 to-teal-400',
    verified: true,
    balance: 16.1214,
    balanceUsd: 2193.03,
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3890.42,
    change24h: 2.34,
    marketCap: '$468B MC',
    avatar: '◆',
    avatarBg: 'bg-gradient-to-br from-blue-400 to-purple-500',
    verified: true,
    balance: 0.5,
    balanceUsd: 1945.21,
  },
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 104250.00,
    change24h: 1.85,
    marketCap: '$2.1T MC',
    avatar: '₿',
    avatarBg: 'bg-gradient-to-br from-orange-400 to-yellow-500',
    verified: true,
    balance: 0.025,
    balanceUsd: 2606.25,
  },
];

export const defaultAccounts: Account[] = [
  {
    id: 'account1',
    name: 'Account 1',
    balance: 0.00,
    avatar: 'A1',
    avatarBg: 'bg-gray-600',
  },
  {
    id: 'solana',
    name: 'Solana',
    balance: 2192.72,
    avatar: 'S',
    avatarBg: 'bg-purple-500',
    verified: true,
  },
  {
    id: 'network',
    name: 'net work',
    balance: 0.00000001,
    avatar: 'N',
    avatarBg: 'bg-purple-600',
  },
];

export const chatItems: ChatItem[] = [
  {
    id: '1',
    token: {
      id: '1649ac',
      symbol: '1649AC',
      name: '1649AC',
      price: 0.00113132,
      change24h: 13563.47,
      marketCap: '$1.1M MC',
      avatar: '1649AC',
      avatarBg: 'bg-yellow-600',
    },
    lastMessage: '',
    participants: 11,
  },
  {
    id: '2',
    token: {
      id: 'sol',
      symbol: 'SOL',
      name: 'SOL',
      price: 136.12,
      change24h: -1.05,
      marketCap: '$76B MC',
      avatar: '◎',
      avatarBg: 'bg-gradient-to-br from-purple-500 to-teal-400',
    },
    lastMessage: '',
    participants: 10,
  },
  {
    id: '3',
    token: {
      id: 'digimon',
      symbol: 'DIGIMON',
      name: 'DIGIMON',
      price: 0.00047452,
      change24h: 206.62,
      marketCap: '$487K MC',
      avatar: '🤖',
      avatarBg: 'bg-blue-500',
    },
    lastMessage: '',
    participants: 10,
  },
];

export const recentChats: ChatItem[] = [
  {
    id: '4',
    token: {
      id: 'eth',
      symbol: 'ETH',
      name: 'ETH',
      price: 3890.42,
      change24h: 2.34,
      marketCap: '$468B MC',
      avatar: '◆',
      avatarBg: 'bg-gradient-to-br from-blue-400 to-purple-500',
    },
    lastMessage: 'How much does ETH have to cost for me...',
    participants: 2,
  },
  {
    id: '5',
    token: {
      id: 'sol',
      symbol: 'SOL',
      name: 'SOL',
      price: 136.12,
      change24h: -1.05,
      marketCap: '$76B MC',
      avatar: '◎',
      avatarBg: 'bg-gradient-to-br from-purple-500 to-teal-400',
    },
    lastMessage: 'Its okay, i will only get liquidated if it rea...',
    participants: 10,
  },
];

export const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return `$${price.toFixed(8)}`;
  } else if (price < 1) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1000) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

export const formatChange = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

export const formatBalance = (balance: number): string => {
  if (balance < 0.00000001) {
    return '<$0.00000001';
  } else if (balance < 0.01) {
    return `$${balance.toFixed(8)}`;
  }
  return `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
