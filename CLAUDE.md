# SERV-OR - Restaurant Order Management PWA

## Project Overview
A Progressive Web App designed as an order-taking notepad for restaurant workers across multiple locations. Helps manage orders before manually entering them into POS systems. Built to solve handwriting difficulties and memory management during busy service periods.

## Tech Stack

### Frontend Framework
- **React 18+** with functional components and hooks
- **TypeScript** for type safety
- **ShadCN UI** components for consistent design
- **Tailwind CSS** for styling
- **Lucide React** for icons

### PWA Requirements
- **Vite** as build tool with PWA plugin
- **Service Worker** for offline functionality
- **Web App Manifest** for installability
- **Responsive Design** for mobile/tablet/desktop

### Storage & State
- **Local Storage** for persistence (no server/cloud)
- **React Context** for global state management
- **Custom hooks** for data management
- **Daily reset functionality** (9 AM - 2 AM cycle)

## Architecture

### Folder Structure
```
src/
├── components/
│   ├── ui/                 # ShadCN UI components
│   ├── layout/             # Layout components
│   ├── order/              # Order-related components
│   ├── menu/               # Menu and item components
│   └── settings/           # Settings components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and helpers
├── types/                  # TypeScript type definitions
├── data/                   # Sample data and schemas
└── styles/                 # Global styles and themes
```

### Key Components Architecture
```
App
├── MainScreen (New Order / Review Orders)
├── OrderBuilder
│   ├── SearchBar
│   ├── CategoryMenu
│   ├── ItemList
│   ├── ModifierModal
│   └── OrderSummary
├── ReviewOrders
│   ├── OrderCard
│   └── ArchiveControls
└── Settings
    ├── RestaurantManager
    ├── MenuEditor
    └── ModifierEditor
```

## Data Models

### Restaurant
```typescript
interface Restaurant {
  id: string;
  name: string;
  isActive: boolean;
  menu: Menu;
}

interface Menu {
  categories: Category[];
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}
```

### Menu Items & Modifiers
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  modifiers: Modifier[];
  requiredModifiers?: string[]; // IDs of required modifier groups
}

interface Modifier {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  options: ModifierOption[];
  required: boolean;
}

interface ModifierOption {
  id: string;
  name: string;
  price?: number; // For future pricing features
}
```

### Orders
```typescript
interface Order {
  id: string;
  identifier: string; // Table number or customer name
  items: OrderItem[];
  timestamp: Date;
  status: 'active' | 'archived';
}

interface OrderItem {
  id: string;
  menuItemId: string;
  menuItemName: string;
  selectedModifiers: SelectedModifier[];
  customModifiers: string[];
  quantity: number;
}

interface SelectedModifier {
  modifierId: string;
  modifierName: string;
  selectedOptions: string[];
}
```

## Core Features Implementation

### 1. Multi-Restaurant Management
- Settings screen to add/edit restaurants
- JSON import/export functionality
- Active restaurant selection with checkbox system
- Local storage persistence

### 2. Order Taking Interface
**Search Functionality:**
- Real-time filtering as user types
- Search across item names and descriptions
- Debounced search for performance

**Collapsible Categories:**
- Accordion-style menu with single expand
- Smooth animations using Tailwind transitions
- Category badges showing item counts

**Modifier System:**
- Modal popup for modifier selection
- Required vs optional modifier handling
- Custom modifier input field
- Real-time modifier addition in settings

### 3. Order Management
**Order Building:**
- Add items with modifiers
- Edit quantities and modifiers
- Order summary with total item count
- Identifier input (flexible timing)

**Review System:**
- Grid/list view of active orders
- Order details expansion
- Archive functionality
- Search/filter orders by identifier

## UI/UX Specifications

### Design System
**Color Theme:** (Provided ShadCN theme)
```css
:root {
  --radius: 0.65rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.723 0.219 149.579);
  /* ... full theme variables provided */
}
```

**Layout Principles:**
- Mobile-first responsive design
- Touch-friendly interface (44px minimum touch targets)
- High contrast for restaurant lighting conditions
- Fast navigation with minimal taps
- Clear visual hierarchy

### Key Interactions
- **Fast Item Addition:** Search + tap + modifier modal + confirm
- **Category Navigation:** Collapsible sections with smooth animations
- **Order Review:** Swipe/tap to archive completed orders
- **Settings Access:** Easy restaurant switching and menu management

## Development Approach

### Phase 1: Core Infrastructure
1. Set up Vite + React + TypeScript + ShadCN
2. Implement local storage hooks
3. Create basic navigation and layout
4. Build data models and context

### Phase 2: Order Taking
1. Search functionality
2. Category/item display
3. Modifier system
4. Order building flow

### Phase 3: Order Management
1. Review screen
2. Archive functionality
3. Daily reset system

### Phase 4: Settings & Configuration
1. Restaurant management
2. Menu editing
3. JSON import/export
4. Modifier configuration

### Phase 5: PWA Features
1. Service worker implementation
2. Offline functionality
3. Install prompts
4. Performance optimization

## Technical Requirements

### Performance
- Instant search results (< 100ms)
- Smooth 60fps animations
- Minimal bundle size for fast loading
- Efficient re-renders with React.memo

### Storage Strategy
- **Restaurants:** `localStorage.restaurants`
- **Orders:** `localStorage.orders`
- **Settings:** `localStorage.settings`
- **Last Reset:** `localStorage.lastReset`

### Daily Reset Logic
```typescript
const resetTime = 9; // 9 AM
const closeTime = 2;  // 2 AM next day

// Check if reset needed
const shouldReset = () => {
  const now = new Date();
  const lastReset = new Date(localStorage.getItem('lastReset') || 0);
  const currentHour = now.getHours();
  
  // Reset if it's past 9 AM and we haven't reset today
  if (currentHour >= resetTime && !isSameDay(now, lastReset)) {
    return true;
  }
  
  // Reset if it's between midnight and 2 AM and we haven't reset for this service
  if (currentHour >= 0 && currentHour < closeTime && !isServiceReset(lastReset)) {
    return true;
  }
  
  return false;
};
```

### Error Handling
- Graceful degradation for storage failures
- Toast notifications for user feedback
- Offline indicators
- Data validation and sanitization

## Testing Strategy
- **Unit Tests:** Custom hooks and utilities
- **Integration Tests:** Order flow end-to-end
- **PWA Testing:** Offline functionality
- **Device Testing:** Various mobile devices and screen sizes

## Deployment
- **Build:** Vite production build with PWA optimizations
- **Hosting:** Static hosting (Vercel/Netlify recommended)
- **Updates:** Cache busting for PWA updates
- **Analytics:** Optional usage tracking (privacy-focused)

## Future Enhancements
- Export orders to various formats
- Basic reporting features
- Multiple language support
- Voice input for orders
- Integration options for specific POS systems

## Development Notes
- Prioritize speed and reliability over complex features
- Keep UI simple and intuitive for high-stress environments
- Test extensively on actual mobile devices
- Consider left-handed users in touch interactions
- Ensure accessibility compliance (WCAG 2.1 AA)

## Sample Data Structure
Include sample restaurant data for development and testing:
- Bistro with typical menu structure
- Fast food restaurant layout
- Fine dining with complex modifiers
- Café with simple offerings

This provides comprehensive context for building a production-ready restaurant order management PWA that meets all specified requirements while maintaining excellent performance and user experience.

## Commands to Remember
- **Development:** `npm run dev` - Start development server
- **Build:** `npm run build` - Production build
- **Lint:** `npm run lint` - Run ESLint
- **Preview:** `npm run preview` - Preview production build

## Current Status
✅ Project structure set up
✅ Vite + React + TypeScript configured  
✅ Tailwind CSS v3 properly configured
✅ ShadCN UI utilities ready
✅ PWA plugin configured
✅ TypeScript types defined
✅ Sample data created
✅ Development server working
✅ Styling system functional