# E-commerce CMS - Frontend

Storefront and admin panel of the e-commerce platform. For now it runs on **mock data** that lives in the browser
(`localStorage`), so it works without a backend. The data layer is shaped like a REST API so it can be swapped for the
Spring Boot API in [API-REST-JAVA-ECOMMERCE](https://github.com/Jhon-David-Toro/API-REST-JAVA-ECOMMERCE) later.

## Stack

- Next.js 16 (App Router, Turbopack) and React 19
- TypeScript (strict) and SCSS Modules
- Zustand for client state
- Vitest and Testing Library for tests

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## What is inside

**Storefront**

| Route | Screen |
| --- | --- |
| `/` | Home: banner, hero, new arrivals, top selling, categories, reviews |
| `/products` | Catalog with filters, sorting and pagination |
| `/product-details/[id]` | Product page: gallery, options, details, reviews, FAQs |
| `/search?q=` | Search results |
| `/cart` | Cart with promo code |
| `/checkout`, `/checkout/success/[id]` | Checkout (cash on delivery or bank transfer) and confirmation |
| `/login`, `/register` | Sign in and sign up |
| `/account`, `/account/orders/[id]` | Profile and order history of the customer |
| `/p/[slug]` | Static pages written in the admin panel |

**Admin panel** (`/admin`, administrators only)

| Route | What an administrator can do |
| --- | --- |
| `/admin` | See revenue, counters, recent orders and low stock |
| `/admin/products` | List, search, create, edit and delete products |
| `/admin/categories`, `/admin/brands` | Manage categories and brands |
| `/admin/orders` | Follow orders and change their status |
| `/admin/customers` | See customers and block or unblock them |
| `/admin/reviews` | Approve, reject or delete reviews |
| `/admin/content` | Edit the banner, hero, menus and footer of the store |
| `/admin/pages` | Write static pages |
| `/admin/settings` | Store details, shipping rules, low stock alert and promo codes |

### Test accounts

| Role | Email | Password |
| --- | --- | --- |
| Administrator | `admin@shop.test` | `admin123` |
| Customer | `customer@shop.test` | `customer123` |

These exist only in the mock data. To start from scratch, clear the site data of the browser (every key starts with `shop.`).

### From mock data to the API

Every screen talks to a function in a `*.api.ts` file (`catalog.api.ts`, `orders.api.ts`, `auth.api.ts`, ...) that uses
`createRepository` from `src/lib/mock`. When the backend is ready, only those files change: the repositories become HTTP
calls and the screens keep working. Ids are numbers so they match the `Long` ids of the backend.

## Using the REST API

By default the data lives in the browser (`localStorage`). To use the Spring Boot API instead, create `.env.local` with:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

and restart `pnpm dev`. Today **authentication, users (list and block) and categories/brands** talk to the API (JWT in `localStorage`, sent as `Authorization: Bearer`); products, orders, reviews, settings and site content still use the browser data until their endpoints exist. The switch lives in `src/lib/auth/auth.api.ts` and `src/lib/taxonomy/taxonomy.api.ts`; the HTTP client is in `src/lib/shared/http`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint, including the complexity limit and deprecated APIs |
| `npm run test` | Vitest, one `*.test.tsx` per component |
| `npm run test:coverage` | Vitest with a V8 coverage report |

Before opening a pull request run `typecheck`, `lint`, `test` and `build`.

## Project structure

```
src/
  app/                     Next.js routes; pages only compose sections
    (pages)/               storefront routes with banner, navbar and footer
    (admin)/admin/         admin routes behind the admin gate
  components/
    ui/                    generic building blocks (Button, Input, Badge, ...)
    patterns/              domain components (ProductCard, DataTable, RecordGate, ...)
    sections/              page-level sections (Hero, Cart, AdminOrders, ...)
  lib/                     code shared by several components, grouped by domain
    mock/                  localStorage repositories that stand in for the API
    catalog/ orders/ auth/ cart/ content/ settings/ taxonomy/ admin/
    shared/                async, forms, crud, table, format, text, dom, storage
  styles/                  design tokens, mixins and global styles
  test/                    test setup, mocks and factories
```

Every component lives in its own folder:

```
Select/
  Select.tsx               component (named export)
  Select.types.ts          types and interfaces
  Select.constants.ts      constants and lookup tables
  Select.utils.ts          pure logic
  Select.module.scss       styles
  Select.test.tsx          tests
  index.ts                 public exports
  hooks/                   hooks of the component
  parts/                   sub-components
```

## Conventions

- Named exports only, except for Next.js pages and layouts.
- Types never live in `.tsx`, hooks or utils; constants never live in `.tsx`.
- `useEffect` bodies only call a named function or return a cleanup.
- Every function stays at a complexity of 10 or less and is documented with JSDoc in English.
- Class names are built with `cx()` from `@/lib/shared/classnames/cx`.
- Commits follow Conventional Commits and have a subject line only.
