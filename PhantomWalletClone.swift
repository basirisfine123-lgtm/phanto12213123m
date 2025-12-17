import SwiftUI

// MARK: - App Entry Point
@main
struct PhantomWalletApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.dark)
        }
    }
}

// MARK: - Models
struct Token: Identifiable {
    let id: String
    let name: String
    let symbol: String
    let avatar: String
    let avatarBg: Color
    var balance: Double
    var price: Double
    var change24h: Double
    var isVerified: Bool
    var marketCap: String
}

struct Account: Identifiable {
    let id: String
    var name: String
    var balance: Double
    var isSelected: Bool
    var isVerified: Bool
}

struct ChatItem: Identifiable {
    let id: String
    let token: Token
    let participants: Int
    var lastMessage: String?
}

// MARK: - Mock Data
class WalletStore: ObservableObject {
    @Published var username: String = "Account 1"
    @Published var cashBalance: Double = 0.00
    @Published var accounts: [Account] = [
        Account(id: "1", name: "Account 1", balance: 1234.56, isSelected: true, isVerified: true),
        Account(id: "2", name: "Account 2", balance: 567.89, isSelected: false, isVerified: false)
    ]
    @Published var userTokens: [Token] = [
        Token(id: "sol", name: "Solana", symbol: "SOL", avatar: "◎", avatarBg: Color.purple, balance: 12.5, price: 98.45, change24h: 5.23, isVerified: true, marketCap: "$42.1B"),
        Token(id: "btc", name: "Bitcoin", symbol: "BTC", avatar: "₿", avatarBg: Color.orange, balance: 0.05, price: 43250.00, change24h: -2.15, isVerified: true, marketCap: "$847B"),
        Token(id: "eth", name: "Ethereum", symbol: "ETH", avatar: "Ξ", avatarBg: Color.blue, balance: 1.25, price: 2280.00, change24h: 3.45, isVerified: true, marketCap: "$274B"),
        Token(id: "usdc", name: "USD Coin", symbol: "USDC", avatar: "$", avatarBg: Color.blue.opacity(0.7), balance: 500.00, price: 1.00, change24h: 0.01, isVerified: true, marketCap: "$24.5B")
    ]
    
    var totalBalance: Double {
        userTokens.reduce(0) { $0 + ($1.balance * $1.price) }
    }
    
    var change24h: Double {
        let totalChange = userTokens.reduce(0.0) { result, token in
            result + (token.balance * token.price * token.change24h / 100)
        }
        return totalChange
    }
    
    var changePercent: Double {
        guard totalBalance > 0 else { return 0 }
        return (change24h / (totalBalance - change24h)) * 100
    }
    
    func addAccount() {
        let newId = UUID().uuidString
        let newAccount = Account(
            id: newId,
            name: "Account \(accounts.count + 1)",
            balance: 0.00,
            isSelected: false,
            isVerified: false
        )
        accounts.append(newAccount)
    }
    
    func selectAccount(_ id: String) {
        for i in 0..<accounts.count {
            accounts[i].isSelected = accounts[i].id == id
        }
        if let selected = accounts.first(where: { $0.id == id }) {
            username = selected.name
        }
    }
    
    func updateAccountName(_ id: String, name: String) {
        if let index = accounts.firstIndex(where: { $0.id == id }) {
            accounts[index].name = name
            if accounts[index].isSelected {
                username = name
            }
        }
    }
}

let trendingTokens: [Token] = [
    Token(id: "bonk", name: "Bonk", symbol: "BONK", avatar: "🐕", avatarBg: Color.orange, balance: 0, price: 0.00001234, change24h: 15.67, isVerified: true, marketCap: "$1.2B"),
    Token(id: "wif", name: "dogwifhat", symbol: "WIF", avatar: "🎩", avatarBg: Color.pink, balance: 0, price: 2.45, change24h: -8.32, isVerified: true, marketCap: "$2.4B"),
    Token(id: "jup", name: "Jupiter", symbol: "JUP", avatar: "🪐", avatarBg: Color.green, balance: 0, price: 0.85, change24h: 12.45, isVerified: true, marketCap: "$1.1B"),
    Token(id: "pyth", name: "Pyth Network", symbol: "PYTH", avatar: "🔮", avatarBg: Color.purple, balance: 0, price: 0.42, change24h: -3.21, isVerified: true, marketCap: "$672M"),
    Token(id: "render", name: "Render", symbol: "RNDR", avatar: "🎨", avatarBg: Color.red, balance: 0, price: 7.89, change24h: 6.78, isVerified: true, marketCap: "$3.1B")
]

let chatItems: [ChatItem] = [
    ChatItem(id: "1", token: trendingTokens[0], participants: 12543, lastMessage: nil),
    ChatItem(id: "2", token: trendingTokens[1], participants: 8921, lastMessage: nil),
    ChatItem(id: "3", token: trendingTokens[2], participants: 6234, lastMessage: nil)
]

let recentChats: [ChatItem] = [
    ChatItem(id: "r1", token: trendingTokens[3], participants: 2341, lastMessage: "Just bought more! 🚀"),
    ChatItem(id: "r2", token: trendingTokens[4], participants: 1892, lastMessage: "When moon?")
]

// MARK: - Helper Functions
func formatPrice(_ price: Double) -> String {
    if price < 0.01 {
        return String(format: "$%.8f", price)
    } else if price < 1 {
        return String(format: "$%.4f", price)
    } else if price < 1000 {
        return String(format: "$%.2f", price)
    } else {
        return String(format: "$%.0f", price)
    }
}

func formatBalance(_ balance: Double) -> String {
    if balance == 0 { return "0" }
    if balance < 0.0001 { return String(format: "%.8f", balance) }
    if balance < 1 { return String(format: "%.4f", balance) }
    return String(format: "%.2f", balance)
}

func formatChange(_ change: Double) -> String {
    let sign = change >= 0 ? "+" : ""
    return "\(sign)\(String(format: "%.2f", change))%"
}

// MARK: - Main Content View
struct ContentView: View {
    @StateObject private var store = WalletStore()
    @State private var activeTab: Tab = .home
    @State private var isProfileOpen = false
    
    enum Tab: String, CaseIterable {
        case home = "Home"
        case swap = "Swap"
        case discover = "Discover"
        case cash = "Cash"
        case chats = "Chats"
        
        var icon: String {
            switch self {
            case .home: return "house.fill"
            case .swap: return "arrow.triangle.2.circlepath"
            case .discover: return "magnifyingglass"
            case .cash: return "dollarsign.circle.fill"
            case .chats: return "bubble.left.and.bubble.right.fill"
            }
        }
    }
    
    var body: some View {
        ZStack {
            Color.black.ignoresSafeArea()
            
            VStack(spacing: 0) {
                // Main Content
                Group {
                    switch activeTab {
                    case .home:
                        HomePage(store: store, onProfileClick: { isProfileOpen = true })
                    case .swap:
                        SwapPage(store: store, onProfileClick: { isProfileOpen = true })
                    case .discover:
                        DiscoverPage(store: store, onProfileClick: { isProfileOpen = true })
                    case .cash:
                        CashPage(store: store, onProfileClick: { isProfileOpen = true })
                    case .chats:
                        ChatsPage(store: store, onProfileClick: { isProfileOpen = true })
                    }
                }
                .frame(maxHeight: .infinity)
                
                // Bottom Navigation
                BottomNavBar(activeTab: $activeTab)
            }
            
            // Profile Drawer
            if isProfileOpen {
                ProfileDrawer(store: store, isOpen: $isProfileOpen)
            }
        }
    }
}

// MARK: - Bottom Navigation
struct BottomNavBar: View {
    @Binding var activeTab: ContentView.Tab
    
    var body: some View {
        HStack {
            ForEach(ContentView.Tab.allCases, id: \.self) { tab in
                Button(action: { activeTab = tab }) {
                    VStack(spacing: 4) {
                        Image(systemName: tab.icon)
                            .font(.system(size: 20))
                        Text(tab.rawValue)
                            .font(.caption2)
                    }
                    .foregroundColor(activeTab == tab ? .white : .gray)
                    .frame(maxWidth: .infinity)
                }
            }
        }
        .padding(.vertical, 12)
        .padding(.bottom, 20)
        .background(Color.black.opacity(0.95))
    }
}

// MARK: - Home Page
struct HomePage: View {
    @ObservedObject var store: WalletStore
    var onProfileClick: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header
                HStack {
                    Button(action: onProfileClick) {
                        Circle()
                            .fill(LinearGradient(colors: [.orange, .red], startPoint: .topLeading, endPoint: .bottomTrailing))
                            .frame(width: 32, height: 32)
                            .overlay(Text("🔥").font(.caption))
                    }
                    Text(store.username)
                        .foregroundColor(.gray)
                    Spacer()
                    HStack(spacing: 16) {
                        Image(systemName: "bell")
                        Image(systemName: "gearshape")
                    }
                    .foregroundColor(.gray)
                }
                .padding(.horizontal)
                
                // Balance
                VStack(spacing: 8) {
                    Text(formatPrice(store.totalBalance))
                        .font(.system(size: 48, weight: .bold))
                        .foregroundColor(.white)
                    
                    HStack(spacing: 4) {
                        Text(store.change24h >= 0 ? "+\(formatPrice(abs(store.change24h)))" : "-\(formatPrice(abs(store.change24h)))")
                        Text("(\(formatChange(store.changePercent)))")
                    }
                    .foregroundColor(store.change24h >= 0 ? .green : .red)
                    .font(.subheadline)
                }
                .padding(.vertical, 20)
                
                // Action Buttons
                HStack(spacing: 24) {
                    ActionButton(icon: "arrow.down", label: "Receive")
                    ActionButton(icon: "arrow.up", label: "Send")
                    ActionButton(icon: "arrow.triangle.2.circlepath", label: "Swap")
                    ActionButton(icon: "plus", label: "Buy")
                }
                .padding(.horizontal)
                
                // Cash Balance Card
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Cash Balance")
                            .foregroundColor(.gray)
                            .font(.subheadline)
                        Text(formatPrice(store.cashBalance))
                            .font(.title2)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                    }
                    Spacer()
                    Button("Add Cash") {}
                        .font(.subheadline.bold())
                        .foregroundColor(.black)
                        .padding(.horizontal, 16)
                        .padding(.vertical, 8)
                        .background(Color.white)
                        .cornerRadius(20)
                }
                .padding()
                .background(Color.gray.opacity(0.15))
                .cornerRadius(16)
                .padding(.horizontal)
                
                // Tokens Section
                VStack(alignment: .leading, spacing: 12) {
                    Text("Tokens")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.horizontal)
                    
                    ForEach(store.userTokens) { token in
                        TokenRow(token: token, showBalance: true)
                    }
                }
                
                // Collectibles Section
                VStack(alignment: .leading, spacing: 12) {
                    Text("Collectibles")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.horizontal)
                    
                    HStack(spacing: 12) {
                        ForEach(0..<3) { _ in
                            RoundedRectangle(cornerRadius: 12)
                                .fill(Color.gray.opacity(0.2))
                                .frame(width: 100, height: 100)
                        }
                    }
                    .padding(.horizontal)
                }
                
                Spacer(minLength: 100)
            }
            .padding(.top)
        }
    }
}

struct ActionButton: View {
    let icon: String
    let label: String
    
    var body: some View {
        VStack(spacing: 8) {
            Circle()
                .fill(Color.gray.opacity(0.2))
                .frame(width: 56, height: 56)
                .overlay(
                    Image(systemName: icon)
                        .foregroundColor(.white)
                        .font(.system(size: 20))
                )
            Text(label)
                .font(.caption)
                .foregroundColor(.gray)
        }
    }
}

// MARK: - Token Row
struct TokenRow: View {
    let token: Token
    var showBalance: Bool = false
    
    var body: some View {
        HStack(spacing: 12) {
            // Avatar
            Circle()
                .fill(token.avatarBg)
                .frame(width: 44, height: 44)
                .overlay(Text(token.avatar).font(.title3))
            
            // Name & Info
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 4) {
                    Text(token.name)
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                    if token.isVerified {
                        Image(systemName: "checkmark.seal.fill")
                            .font(.caption)
                            .foregroundColor(.blue)
                    }
                }
                Text(token.marketCap)
                    .font(.caption)
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            // Price & Change
            VStack(alignment: .trailing, spacing: 2) {
                if showBalance {
                    Text(formatPrice(token.balance * token.price))
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                    Text("\(formatBalance(token.balance)) \(token.symbol)")
                        .font(.caption)
                        .foregroundColor(.gray)
                } else {
                    Text(formatPrice(token.price))
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                    Text(formatChange(token.change24h))
                        .font(.caption)
                        .foregroundColor(token.change24h >= 0 ? .green : .red)
                }
            }
        }
        .padding(.horizontal)
        .padding(.vertical, 8)
    }
}

// MARK: - Swap Page
struct SwapPage: View {
    @ObservedObject var store: WalletStore
    var onProfileClick: () -> Void
    @State private var payAmount: String = ""
    @State private var receiveAmount: String = ""
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header
                HStack {
                    Button(action: onProfileClick) {
                        Circle()
                            .fill(LinearGradient(colors: [.orange, .red], startPoint: .topLeading, endPoint: .bottomTrailing))
                            .frame(width: 32, height: 32)
                            .overlay(Text("🔥").font(.caption))
                    }
                    Text(store.username)
                        .foregroundColor(.gray)
                    Spacer()
                }
                .padding(.horizontal)
                
                Text("Swap")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                // Swap Interface
                VStack(spacing: 0) {
                    // You Pay
                    VStack(alignment: .leading, spacing: 8) {
                        Text("You Pay")
                            .font(.caption)
                            .foregroundColor(.gray)
                        HStack {
                            TextField("0", text: $payAmount)
                                .font(.system(size: 32, weight: .bold))
                                .foregroundColor(.white)
                                .keyboardType(.decimalPad)
                            Spacer()
                            HStack {
                                Circle()
                                    .fill(Color.purple)
                                    .frame(width: 28, height: 28)
                                    .overlay(Text("◎").font(.caption))
                                Text("SOL")
                                    .fontWeight(.semibold)
                                    .foregroundColor(.white)
                                Image(systemName: "chevron.down")
                                    .foregroundColor(.gray)
                            }
                            .padding(.horizontal, 12)
                            .padding(.vertical, 8)
                            .background(Color.gray.opacity(0.2))
                            .cornerRadius(20)
                        }
                    }
                    .padding()
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(16)
                    
                    // Swap Button
                    Button(action: {}) {
                        Circle()
                            .fill(Color.gray.opacity(0.3))
                            .frame(width: 40, height: 40)
                            .overlay(
                                Image(systemName: "arrow.up.arrow.down")
                                    .foregroundColor(.white)
                            )
                    }
                    .offset(y: -20)
                    .zIndex(1)
                    
                    // You Receive
                    VStack(alignment: .leading, spacing: 8) {
                        Text("You Receive")
                            .font(.caption)
                            .foregroundColor(.gray)
                        HStack {
                            TextField("0", text: $receiveAmount)
                                .font(.system(size: 32, weight: .bold))
                                .foregroundColor(.white)
                                .keyboardType(.decimalPad)
                            Spacer()
                            HStack {
                                Circle()
                                    .fill(Color.blue)
                                    .frame(width: 28, height: 28)
                                    .overlay(Text("$").font(.caption))
                                Text("USDC")
                                    .fontWeight(.semibold)
                                    .foregroundColor(.white)
                                Image(systemName: "chevron.down")
                                    .foregroundColor(.gray)
                            }
                            .padding(.horizontal, 12)
                            .padding(.vertical, 8)
                            .background(Color.gray.opacity(0.2))
                            .cornerRadius(20)
                        }
                    }
                    .padding()
                    .background(Color.gray.opacity(0.1))
                    .cornerRadius(16)
                    .offset(y: -20)
                }
                .padding(.horizontal)
                
                // Trending Section
                VStack(alignment: .leading, spacing: 12) {
                    Text("Trending")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.horizontal)
                    
                    ForEach(trendingTokens) { token in
                        TokenRow(token: token)
                    }
                }
                
                Spacer(minLength: 100)
            }
            .padding(.top)
        }
    }
}

// MARK: - Discover Page
struct DiscoverPage: View {
    @ObservedObject var store: WalletStore
    var onProfileClick: () -> Void
    @State private var searchText: String = ""
    @State private var activeTab: DiscoverTab = .tokens
    
    enum DiscoverTab: String, CaseIterable {
        case tokens = "Tokens"
        case perps = "Trending Perps"
        case lists = "Lists"
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header
                HStack {
                    Button(action: onProfileClick) {
                        Circle()
                            .fill(LinearGradient(colors: [.orange, .red], startPoint: .topLeading, endPoint: .bottomTrailing))
                            .frame(width: 32, height: 32)
                            .overlay(Text("🔥").font(.caption))
                    }
                    Text(store.username)
                        .foregroundColor(.gray)
                    Spacer()
                }
                .padding(.horizontal)
                
                Text("Discover")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                // Search Bar
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.gray)
                    TextField("Search tokens", text: $searchText)
                        .foregroundColor(.white)
                    Spacer()
                    Button(action: {}) {
                        Image(systemName: "plus")
                            .foregroundColor(.white)
                            .padding(8)
                            .background(Color.purple)
                            .cornerRadius(8)
                    }
                }
                .padding()
                .background(Color.gray.opacity(0.15))
                .cornerRadius(12)
                .padding(.horizontal)
                
                // Tab Selector
                HStack(spacing: 0) {
                    ForEach(DiscoverTab.allCases, id: \.self) { tab in
                        Button(action: { activeTab = tab }) {
                            Text(tab.rawValue)
                                .font(.subheadline)
                                .fontWeight(activeTab == tab ? .semibold : .regular)
                                .foregroundColor(activeTab == tab ? .white : .gray)
                                .padding(.vertical, 12)
                                .frame(maxWidth: .infinity)
                                .background(activeTab == tab ? Color.gray.opacity(0.2) : Color.clear)
                                .cornerRadius(8)
                        }
                    }
                }
                .padding(.horizontal)
                
                // Content
                if activeTab == .tokens {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Trending Tokens")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding(.horizontal)
                        
                        ForEach(Array(trendingTokens.enumerated()), id: \.element.id) { index, token in
                            HStack {
                                Text("\(index + 1)")
                                    .font(.caption)
                                    .foregroundColor(.gray)
                                    .frame(width: 20)
                                TokenRow(token: token)
                            }
                        }
                    }
                } else if activeTab == .perps {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Trending Perps")
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding(.horizontal)
                        
                        ForEach(trendingTokens.prefix(3)) { token in
                            TokenRow(token: token)
                        }
                    }
                } else {
                    VStack(spacing: 20) {
                        Text("Top Lists")
                            .font(.headline)
                            .foregroundColor(.white)
                        
                        ForEach(["🔥 Hot", "📈 Gainers", "📉 Losers"], id: \.self) { list in
                            HStack {
                                Text(list)
                                    .foregroundColor(.white)
                                Spacer()
                                Image(systemName: "chevron.right")
                                    .foregroundColor(.gray)
                            }
                            .padding()
                            .background(Color.gray.opacity(0.15))
                            .cornerRadius(12)
                        }
                    }
                    .padding(.horizontal)
                }
                
                Spacer(minLength: 100)
            }
            .padding(.top)
        }
    }
}

// MARK: - Cash Page
struct CashPage: View {
    @ObservedObject var store: WalletStore
    var onProfileClick: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header
                HStack {
                    Button(action: onProfileClick) {
                        Circle()
                            .fill(LinearGradient(colors: [.orange, .red], startPoint: .topLeading, endPoint: .bottomTrailing))
                            .frame(width: 32, height: 32)
                            .overlay(Text("🔥").font(.caption))
                    }
                    Text(store.username)
                        .foregroundColor(.gray)
                    Spacer()
                }
                .padding(.horizontal)
                
                Text("Cash")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                
                // Balance Display
                VStack(spacing: 8) {
                    Text(formatPrice(store.cashBalance))
                        .font(.system(size: 48, weight: .bold))
                        .foregroundColor(.white)
                    Text("Cash Balance")
                        .foregroundColor(.gray)
                }
                .padding(.vertical, 30)
                
                // Waitlist Banner
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Join the waitlist!")
                            .font(.headline)
                            .foregroundColor(.white)
                        Text("Be first to get Phantom Cash")
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                    Spacer()
                    Button("Join") {}
                        .font(.subheadline.bold())
                        .foregroundColor(.black)
                        .padding(.horizontal, 20)
                        .padding(.vertical, 10)
                        .background(Color.white)
                        .cornerRadius(20)
                }
                .padding()
                .background(LinearGradient(colors: [.purple.opacity(0.3), .blue.opacity(0.3)], startPoint: .leading, endPoint: .trailing))
                .cornerRadius(16)
                .padding(.horizontal)
                
                // Add Cash Options
                VStack(alignment: .leading, spacing: 16) {
                    Text("Add Cash")
                        .font(.headline)
                        .foregroundColor(.white)
                    
                    CashOptionRow(icon: "arrow.left.arrow.right", title: "Quick Sell Crypto", subtitle: "Convert crypto to cash instantly")
                    CashOptionRow(icon: "creditcard", title: "Bank, Card, or Apple Pay", subtitle: "Coming soon")
                    CashOptionRow(icon: "arrow.down.circle", title: "Direct Deposit", subtitle: "Coming soon")
                }
                .padding(.horizontal)
                
                Spacer(minLength: 100)
            }
            .padding(.top)
        }
    }
}

struct CashOptionRow: View {
    let icon: String
    let title: String
    let subtitle: String
    
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.purple)
                .frame(width: 44, height: 44)
                .background(Color.purple.opacity(0.2))
                .cornerRadius(12)
            
            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                Text(subtitle)
                    .font(.caption)
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            Image(systemName: "chevron.right")
                .foregroundColor(.gray)
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
    }
}

// MARK: - Chats Page
struct ChatsPage: View {
    @ObservedObject var store: WalletStore
    var onProfileClick: () -> Void
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header
                HStack {
                    Button(action: onProfileClick) {
                        Circle()
                            .fill(LinearGradient(colors: [.orange, .red], startPoint: .topLeading, endPoint: .bottomTrailing))
                            .frame(width: 32, height: 32)
                            .overlay(Text("🔥").font(.caption))
                    }
                    Text(store.username)
                        .foregroundColor(.gray)
                    Spacer()
                }
                .padding(.horizontal)
                
                Text("Chats")
                    .font(.title)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                
                // Trending Section
                VStack(alignment: .leading, spacing: 12) {
                    Text("Trending")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.horizontal)
                    
                    ForEach(chatItems) { chat in
                        ChatRow(chat: chat)
                    }
                }
                
                // Recent Section
                VStack(alignment: .leading, spacing: 12) {
                    Text("Recent")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding(.horizontal)
                    
                    ForEach(recentChats) { chat in
                        ChatRow(chat: chat, showLastMessage: true)
                    }
                }
                
                Spacer(minLength: 100)
            }
            .padding(.top)
        }
    }
}

struct ChatRow: View {
    let chat: ChatItem
    var showLastMessage: Bool = false
    
    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .fill(chat.token.avatarBg)
                .frame(width: 44, height: 44)
                .overlay(Text(chat.token.avatar).font(.title3))
            
            VStack(alignment: .leading, spacing: 2) {
                Text(chat.token.name)
                    .fontWeight(.semibold)
                    .foregroundColor(.white)
                if showLastMessage, let message = chat.lastMessage {
                    Text(message)
                        .font(.caption)
                        .foregroundColor(.gray)
                        .lineLimit(1)
                } else {
                    Text(chat.token.marketCap)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
            
            Spacer()
            
            HStack(spacing: 4) {
                Image(systemName: "person.2.fill")
                    .font(.caption)
                Text("\(chat.participants)")
                    .font(.caption)
            }
            .foregroundColor(.gray)
        }
        .padding(.horizontal)
        .padding(.vertical, 8)
        .background(Color.gray.opacity(0.1))
        .cornerRadius(12)
        .padding(.horizontal)
    }
}

// MARK: - Profile Drawer
struct ProfileDrawer: View {
    @ObservedObject var store: WalletStore
    @Binding var isOpen: Bool
    @State private var editingAccountId: String? = nil
    @State private var editValue: String = ""
    
    var body: some View {
        ZStack {
            // Backdrop
            Color.black.opacity(0.5)
                .ignoresSafeArea()
                .onTapGesture { isOpen = false }
            
            // Drawer
            VStack(spacing: 0) {
                Spacer()
                
                VStack(spacing: 20) {
                    // Handle
                    Capsule()
                        .fill(Color.gray.opacity(0.5))
                        .frame(width: 40, height: 4)
                        .padding(.top, 12)
                    
                    // Profile Header
                    VStack(spacing: 12) {
                        Circle()
                            .fill(LinearGradient(colors: [.orange, .red], startPoint: .topLeading, endPoint: .bottomTrailing))
                            .frame(width: 64, height: 64)
                            .overlay(Text("🔥").font(.title))
                        
                        Text(store.username)
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    }
                    
                    // Action Buttons
                    HStack(spacing: 16) {
                        ProfileActionButton(icon: "doc.on.doc", label: "Copy")
                        ProfileActionButton(icon: "square.and.arrow.up", label: "Share")
                        ProfileActionButton(icon: "globe", label: "View")
                    }
                    
                    // Cash Balance
                    HStack {
                        Text("Cash Balance")
                            .foregroundColor(.gray)
                        Spacer()
                        Text(formatPrice(store.cashBalance))
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                    }
                    .padding()
                    .background(Color.gray.opacity(0.15))
                    .cornerRadius(12)
                    
                    // Accounts List
                    VStack(spacing: 8) {
                        ForEach(store.accounts) { account in
                            AccountRow(
                                account: account,
                                isEditing: editingAccountId == account.id,
                                editValue: $editValue,
                                onSelect: { store.selectAccount(account.id) },
                                onEdit: {
                                    editingAccountId = account.id
                                    editValue = account.name
                                },
                                onSave: {
                                    store.updateAccountName(account.id, name: editValue)
                                    editingAccountId = nil
                                }
                            )
                        }
                        
                        // Add Account Button
                        Button(action: { store.addAccount() }) {
                            HStack {
                                Image(systemName: "plus.circle.fill")
                                    .foregroundColor(.purple)
                                Text("Add Account")
                                    .foregroundColor(.white)
                                Spacer()
                            }
                            .padding()
                            .background(Color.gray.opacity(0.1))
                            .cornerRadius(12)
                        }
                    }
                    
                    Spacer(minLength: 40)
                }
                .padding(.horizontal)
                .frame(maxHeight: UIScreen.main.bounds.height * 0.7)
                .background(Color(white: 0.1))
                .cornerRadius(24, corners: [.topLeft, .topRight])
            }
        }
        .transition(.opacity)
    }
}

struct ProfileActionButton: View {
    let icon: String
    let label: String
    
    var body: some View {
        VStack(spacing: 8) {
            Circle()
                .fill(Color.gray.opacity(0.2))
                .frame(width: 48, height: 48)
                .overlay(
                    Image(systemName: icon)
                        .foregroundColor(.white)
                )
            Text(label)
                .font(.caption)
                .foregroundColor(.gray)
        }
    }
}

struct AccountRow: View {
    let account: Account
    let isEditing: Bool
    @Binding var editValue: String
    var onSelect: () -> Void
    var onEdit: () -> Void
    var onSave: () -> Void
    
    var body: some View {
        HStack(spacing: 12) {
            // Selection Indicator
            Circle()
                .stroke(account.isSelected ? Color.purple : Color.gray.opacity(0.3), lineWidth: 2)
                .frame(width: 20, height: 20)
                .overlay(
                    Circle()
                        .fill(account.isSelected ? Color.purple : Color.clear)
                        .frame(width: 12, height: 12)
                )
                .onTapGesture(perform: onSelect)
            
            // Account Info
            VStack(alignment: .leading, spacing: 2) {
                if isEditing {
                    TextField("Account name", text: $editValue, onCommit: onSave)
                        .foregroundColor(.white)
                        .textFieldStyle(PlainTextFieldStyle())
                } else {
                    HStack(spacing: 4) {
                        Text(account.name)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                        if account.isVerified {
                            Image(systemName: "checkmark.seal.fill")
                                .font(.caption)
                                .foregroundColor(.blue)
                        }
                    }
                }
                Text(formatPrice(account.balance))
                    .font(.caption)
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            // Edit Button
            Button(action: isEditing ? onSave : onEdit) {
                Image(systemName: isEditing ? "checkmark" : "pencil")
                    .foregroundColor(.gray)
            }
        }
        .padding()
        .background(Color.gray.opacity(account.isSelected ? 0.2 : 0.1))
        .cornerRadius(12)
    }
}

// MARK: - Corner Radius Extension
extension View {
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape(RoundedCorner(radius: radius, corners: corners))
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners
    
    func path(in rect: CGRect) -> Path {
        let path = UIBezierPath(roundedRect: rect, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius))
        return Path(path.cgPath)
    }
}

// MARK: - Preview
#Preview {
    ContentView()
}
