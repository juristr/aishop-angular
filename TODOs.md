d# React to Angular Migration TODOs for @aishop-angular Nx Workspace

## Overview

This document provides a step-by-step checklist to migrate the React-based @aishop e-commerce application to Angular while maintaining the exact Nx workspace structure, library architecture, and dependency relationships. The target workspace is already configured with Angular and has a working application with Tailwind CSS.

---

## Phase 1: Pre-Migration Analysis & Setup

### ✅ Analysis Complete

- [x] Identify reusable libraries (TypeScript only)
- [x] Identify libraries requiring rewrite (React components)
- [x] Document current dependency relationships
- [x] Document current folder structure and tags

### 🔧 Source Code Preparation

- [ ] Copy original React source code to `tmp-src/` folder at workspace root for reference
- [ ] Verify target Angular workspace is properly configured
- [ ] Confirm existing Angular application is working with Tailwind CSS

---

## Phase 2: Regenerate Reusable Libraries for Angular Workspace

### 📁 Data Access Libraries (Regenerate with Nx)

**Important**: While the TypeScript source code remains the same, regenerate these libraries using Nx generators to ensure proper Angular workspace integration. Copy the original source files from `tmp-src/` folder after generation.

- [ ] **@aishop-angular/data-access-order**
  ```bash
  npx nx g @nx/js:library data-access-order --directory=packages/orders/data-access-order --bundler=tsc --tags=npm:private,scope:orders,type:data-access --unitTestRunner=jest
  ```
  - Copy source files from `tmp-src/packages/orders/data-access-order/src/`
  - Dependencies: `@aishop-angular/utils`
  - ✅ Contains only TypeScript functions and imports
- [ ] **@aishop-angular/data-access-products**
  ```bash
  npx nx g @nx/js:library data-access-products --directory=packages/products/data-access-products --bundler=tsc --tags=npm:private,scope:products,type:data-access --unitTestRunner=jest
  ```
  - Copy source files from `tmp-src/packages/products/data-access-products/src/`
  - Dependencies: `@aishop-angular/utils`
  - ✅ Contains Product interface, data array, and utility functions

### 🛠️ Utility Libraries (Regenerate with Nx)

- [ ] **@aishop-angular/utils**
  ```bash
  npx nx g @nx/js:library utils --directory=packages/shared/utils --bundler=tsc --tags=npm:private,scope:shared,type:util --unitTestRunner=jest
  ```
  - Copy source files from `tmp-src/packages/shared/utils/src/`
  - Dependencies: None
  - ✅ Contains pure TypeScript utility functions

---

## Phase 3: Integrate Libraries with Existing Angular Application

### 🚀 Main Application Integration

**Note**: The Angular application is already configured with routing, Tailwind CSS, and basic layout components.

- [ ] Update application to import and use the new library components
- [ ] Map existing application pages to new Angular feature libraries
- [ ] Verify routing works with new library components
- [ ] Test application startup with integrated libraries

---

## Phase 4: Create Angular Libraries

### 🎨 Shared UI Library

- [ ] **@aishop-angular/ui**
  ```bash
  npx nx g @nx/angular:library ui --directory=packages/shared/ui --tags=npm:public,scope:shared,type:ui --standalone --style=css --unitTestRunner=jest
  ```
  - [ ] Create base UI components
  - [ ] Set up shared styling
  - [ ] Export public API

### 🛒 Orders Domain Libraries

#### UI Components

- [ ] **@aishop-angular/ui-order-detail**
  ```bash
  npx nx g @nx/angular:library ui-order-detail --directory=packages/orders/ui-order-detail --tags=npm:public,scope:orders,type:ui --standalone --style=css --unitTestRunner=jest
  ```
  - [ ] Create order detail display component
  - [ ] Import and use `@aishop-angular/ui` components
  - [ ] Export public API

#### Feature Libraries

- [ ] **@aishop-angular/feat-create-order**

  ```bash
  npx nx g @nx/angular:library feat-create-order --directory=packages/orders/feat-create-order --tags=npm:public,scope:orders,type:feature --standalone --style=css --unitTestRunner=jest
  ```

  - [ ] Create order creation component
  - [ ] Import `@aishop-angular/data-access-order`
  - [ ] Import `@aishop-angular/ui-order-detail`
  - [ ] Implement order creation logic

- [ ] **@aishop-angular/feat-current-orders**

  ```bash
  npx nx g @nx/angular:library feat-current-orders --directory=packages/orders/feat-current-orders --tags=npm:public,scope:orders,type:feature --standalone --style=css --unitTestRunner=jest
  ```

  - [ ] Create current orders list component
  - [ ] Import `@aishop-angular/data-access-order`
  - [ ] Import `@aishop-angular/ui-order-detail`
  - [ ] Implement current orders display logic

- [ ] **@aishop-angular/feat-cancel-order**

  ```bash
  npx nx g @nx/angular:library feat-cancel-order --directory=packages/orders/feat-cancel-order --tags=npm:public,scope:orders,type:feature --standalone --style=css --unitTestRunner=jest
  ```

  - [ ] Create order cancellation component
  - [ ] Import `@aishop-angular/data-access-order`
  - [ ] Import `@aishop-angular/ui-order-detail`
  - [ ] Implement order cancellation logic

- [ ] **@aishop-angular/feat-past-orders**
  ```bash
  npx nx g @nx/angular:library feat-past-orders --directory=packages/orders/feat-past-orders --tags=npm:public,scope:orders,type:feature --standalone --style=css --unitTestRunner=jest
  ```
  - [ ] Create past orders component
  - [ ] Import `@aishop-angular/data-access-order`
  - [ ] Import `@aishop-angular/ui-order-detail`
  - [ ] Implement past orders display logic

### 📦 Products Domain Libraries

#### UI Components

- [ ] **@aishop-angular/ui-product-detail**
  ```bash
  npx nx g @nx/angular:library ui-product-detail --directory=packages/products/ui-product-detail --tags=npm:public,scope:products,type:ui --standalone --style=css --unitTestRunner=jest
  ```
  - [ ] Create product detail display component
  - [ ] Import and use `@aishop-angular/ui` components
  - [ ] Export public API

#### Feature Libraries

- [ ] **@aishop-angular/feat-product-detail**

  ```bash
  npx nx g @nx/angular:library feat-product-detail --directory=packages/products/feat-product-detail --tags=npm:public,scope:products,type:feature --standalone --style=css --unitTestRunner=jest
  ```

  - [ ] Create product detail page component
  - [ ] Import `@aishop-angular/data-access-products`
  - [ ] Import `@aishop-angular/ui-product-detail`
  - [ ] Implement product detail logic with routing

- [ ] **@aishop-angular/feat-product-list**
  ```bash
  npx nx g @nx/angular:library feat-product-list --directory=packages/products/feat-product-list --tags=npm:public,scope:products,type:feature --standalone --style=css --unitTestRunner=jest
  ```
  - [ ] Create product grid component
  - [ ] Import `@aishop-angular/data-access-products`
  - [ ] Implement product listing and filtering logic

---

## Phase 5: Implement Angular Components

### 📄 Application Pages

- [ ] **HomePage Component**

  ```bash
  npx nx g @nx/angular:component pages/home --path=apps/shop/src/app/pages/home/home.component.ts --standalone --style=css --export
  ```

  - [ ] Import `@aishop-angular/feat-product-list`
  - [ ] Implement product grid display
  - [ ] Add filtering buttons (Latest, Popular, Sale)

- [ ] **CreateOrderPage Component**

  ```bash
  npx nx g @nx/angular:component pages/create-order --path=apps/shop/src/app/pages/create-order/create-order.component.ts --standalone --style=css --export
  ```

  - [ ] Import `@aishop-angular/feat-create-order`
  - [ ] Implement page layout and container

- [ ] **OrdersPage Component**

  ```bash
  npx nx g @nx/angular:component pages/orders --path=apps/shop/src/app/pages/orders/orders.component.ts --standalone --style=css --export
  ```

  - [ ] Import `@aishop-angular/feat-current-orders`
  - [ ] Import `@aishop-angular/feat-cancel-order`
  - [ ] Implement combined orders management view

- [ ] **PastOrdersPage Component**
  ```bash
  npx nx g @nx/angular:component pages/past-orders --path=apps/shop/src/app/pages/past-orders/past-orders.component.ts --standalone --style=css --export
  ```
  - [ ] Import `@aishop-angular/feat-past-orders`
  - [ ] Implement past orders display

### 🔄 Routing Configuration

- [ ] Configure main app routes in `apps/shop/src/app/app.routes.ts`:
  ```typescript
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) }
  { path: 'product/:id', loadComponent: () => import('@aishop-angular/feat-product-detail').then(m => m.ProductDetailPageComponent) }
  { path: 'orders', loadComponent: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent) }
  { path: 'orders/past', loadComponent: () => import('./pages/past-orders/past-orders.component').then(m => m.PastOrdersComponent) }
  { path: 'orders/create', loadComponent: () => import('./pages/create-order/create-order.component').then(m => m.CreateOrderComponent) }
  ```

### 🎯 Component Implementation Details

- [ ] **FeatCreateOrder Component**

  - [ ] Use `dataAccessOrder()` function from `@aishop-angular/data-access-order`
  - [ ] Display `UiOrderDetail` component from `@aishop-angular/ui-order-detail`
  - [ ] Implement Angular service for order management

- [ ] **ProductGrid Component**

  - [ ] Use `getProducts()` function from `@aishop-angular/data-access-products`
  - [ ] Implement product card display
  - [ ] Add navigation to product detail page

- [ ] **UiOrderDetail Component**
  - [ ] Use shared UI components from `@aishop-angular/ui`
  - [ ] Implement order display logic
  - [ ] Add proper Angular Input/Output decorators

---

## Phase 6: Testing & E2E

### 🧪 E2E Tests Migration

- [ ] **@aishop-angular/shop-e2e**
  - [ ] Update Playwright tests for Angular application
  - [ ] Maintain existing test scenarios:
    - [ ] `cart.spec.ts` - Update selectors for Angular
    - [ ] `checkout-nav.spec.ts` - Update navigation logic
    - [ ] `homepage-header.spec.ts` - Update header component tests
    - [ ] `homepage.spec.ts` - Update homepage interaction tests
    - [ ] `layout.spec.ts` - Update layout component tests
    - [ ] `navigation.spec.ts` - Update routing tests
    - [ ] `order-management.spec.ts` - Update order management tests
  - [ ] Update page object models for Angular selectors
  - [ ] Test all user workflows end-to-end

### ✅ Build & Dependency Validation

- [ ] Verify all libraries build successfully
  ```bash
  npx nx run-many --target=build --all
  ```
- [ ] Verify dependency graph matches expected structure
  ```bash
  npx nx graph --print
  ```
- [ ] Run all tests
  ```bash
  npx nx run-many --target=test --all
  ```

---

## Phase 7: Final Configuration & Cleanup

### ⚙️ Workspace Configuration

**Note**: The Angular workspace is already properly configured. Only verify configuration is working correctly.

- [ ] Verify `nx.json` has proper plugin configuration for Angular and TypeScript
- [ ] Confirm all Nx plugins are working correctly with new libraries

- [ ] Verify all project tags are correctly set:
  - **scope**: `orders`, `products`, `shared`
  - **type**: `app`, `feature`, `ui`, `data-access`, `util`
  - **npm**: `public`, `private`

### 🗂️ Final Folder Structure Validation

- [ ] Ensure exact folder structure matches:
  ```
  /
  ├── apps/
  │   ├── shop/                    # ✅ Angular app
  │   └── shop-e2e/               # ✅ Updated E2E tests
  ├── packages/
  │   ├── orders/
  │   │   ├── data-access-order/   # ✅ Copied as-is
  │   │   ├── feat-cancel-order/   # ✅ Angular components
  │   │   ├── feat-create-order/   # ✅ Angular components
  │   │   ├── feat-current-orders/ # ✅ Angular components
  │   │   ├── feat-past-orders/    # ✅ Angular components
  │   │   └── ui-order-detail/     # ✅ Angular components
  │   ├── products/
  │   │   ├── data-access-products/# ✅ Copied as-is
  │   │   ├── feat-product-detail/ # ✅ Angular components
  │   │   ├── feat-product-list/   # ✅ Angular components
  │   │   └── ui-product-detail/   # ✅ Angular components
  │   └── shared/
  │       ├── ui/                  # ✅ Angular components
  │       └── utils/               # ✅ Copied as-is
  └── tools/
      └── tailwind-sync-plugin/    # ✅ Copied as-is
  ```

### 🔗 Dependency Verification

- [ ] Verify final dependency graph:
  ```
  @aishop-angular/shop → @aishop-angular/feat-* (6 feature libraries)
  @aishop-angular/feat-create-order → @aishop-angular/data-access-order, @aishop-angular/ui-order-detail
  @aishop-angular/feat-current-orders → @aishop-angular/data-access-order, @aishop-angular/ui-order-detail
  @aishop-angular/feat-cancel-order → @aishop-angular/data-access-order, @aishop-angular/ui-order-detail
  @aishop-angular/feat-past-orders → @aishop-angular/data-access-order, @aishop-angular/ui-order-detail
  @aishop-angular/feat-product-detail → @aishop-angular/data-access-products, @aishop-angular/ui-product-detail
  @aishop-angular/feat-product-list → @aishop-angular/data-access-products
  @aishop-angular/ui-order-detail → @aishop-angular/ui
  @aishop-angular/ui-product-detail → @aishop-angular/ui
  @aishop-angular/data-access-order → @aishop-angular/utils
  @aishop-angular/data-access-products → @aishop-angular/utils
  ```

---

## ⚠️ Critical Reminders

### 🔄 Reusable vs Rewrite

- **✅ REGENERATE & COPY SOURCE**: `data-access-*`, `utils`, `tailwind-sync-plugin` (regenerate with Nx, copy source from `tmp-src/`)
- **❌ REWRITE COMPLETELY**: All `feat-*`, `ui-*`, and integrate with existing `shop` app

### 🏷️ Maintain Tags & Structure

- Keep exact same folder paths and naming conventions
- Preserve all Nx tags for proper workspace organization
- Maintain same dependency relationships between libraries

### 🎯 Angular Best Practices

- Use Angular standalone components for modern patterns
- Implement proper service injection for data access
- Use Angular Router for navigation
- Follow Angular style guide for component architecture

### 🧪 Testing Strategy

- All existing E2E scenarios must pass with Angular implementation
- Maintain same user workflows and functionality
- Update selectors but keep test logic identical

---

## 📋 Success Criteria

- [ ] All libraries build without errors
- [ ] All E2E tests pass
- [ ] Dependency graph matches original structure
- [ ] All React functionality replicated in Angular
- [ ] No breaking changes to reusable libraries
- [ ] Tailwind CSS styling preserved
- [ ] Performance comparable to React version
- [ ] Full workspace validation passes:
  ```bash
  npx nx run-many -t build test lint e2e
  ```
