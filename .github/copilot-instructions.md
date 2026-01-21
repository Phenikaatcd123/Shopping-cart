# Shopping Cart TypeScript - AI Coding Guide

## Project Overview

A React + TypeScript shopping cart application using Vite, React Context for state management, and localStorage persistence. The app fetches products from FakeStore API and allows users to manage cart items.

## Architecture

### Component Structure
- **[src/App.tsx](src/App.tsx)**: Root component combining ProductList and Cart
- **[src/components/](src/components/)**: Presentational components (ProductList, ProductItem, Cart, CartItem)
- **[src/context/CartContext.tsx](src/context/CartContext.tsx)**: Global state management using React Context (not Redux/Zustand)
- **[src/hooks/useProducts.ts](src/hooks/useProducts.ts)**: Custom hook managing product data fetching from API

### Data Flow
1. App initializes with CartProvider wrapper
2. ProductList uses `useProducts` hook to fetch from FakeStore API
3. ProductItem buttons dispatch `addToCart` to CartContext
4. Cart subscribes to CartContext via `useCart` hook
5. All cart changes auto-sync to localStorage (see CartContext useEffect)

### Key Design Decisions
- **Context over Redux**: Simple cart state justifies built-in Context API
- **LocalStorage Persistence**: Cart data survives page refreshes via CartContext useEffect hooks
- **Custom Fetch Hook**: `useProducts` centralizes API logic with loading/error states
- **Type Safety**: CartItem extends Product (adds quantity field)

## Build & Development

### Scripts
```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

### TypeScript Configuration
- **tsconfig.app.json**: App code (ESNext target)
- **tsconfig.node.json**: Build tool config
- **tsconfig.json**: Base config with strict mode enabled

### Build Pipeline
Build script runs `tsc -b` (type-check all projects) before Vite build. Type errors block production builds.

## Coding Patterns

### React Context Usage
```tsx
// Provider wraps app (see App.tsx import pattern)
const { cart, addToCart, total } = useCart();
// Always destructure from context hook return
```

### Custom Hook Pattern (useProducts)
- Returns object with `{ products, loading, error }`
- fetch().then().catch().finally() for API calls
- Loading/error states prevent render crashes

### Component Props
- Product interface: `{ id, title, price, image }`
- CartItem interface: Product + `{ quantity }`
- Always extend types for derived data (CartItem extends Product)

## Dependencies
- **React 19.2**: Latest React with new hooks
- **Vite + Rolldown**: Fast build + HMR
- **TypeScript ~5.9**: Strict mode required
- **ESLint 9**: Flat config (eslint.config.js)

## Key Files Reference
- **Types**: [src/types/product.ts](src/types/product.ts) - Single source of truth for data models
- **API**: [src/api/productApi.ts](src/api/productApi.ts) - Fetch wrapper, error handling included
- **State**: [src/context/CartContext.tsx](src/context/CartContext.tsx) - Complete CRUD operations for cart
- **Styling**: [src/App.css](src/App.css) - CSS Grid layout for two-column design

## Common Tasks

### Adding Cart Methods
Edit CartContext.tsx - add method to CartContextType interface, implement in provider, export via useCart hook.

### Modifying Product Data
Change Product interface in types/product.ts - TypeScript will catch all affected components.

### Adding Components
Keep presentational logic in components/; move state/API logic to context or hooks.

## External API
FakeStore API (`https://fakestoreapi.com/products`) - Public, no auth required. Returns Product objects directly.
