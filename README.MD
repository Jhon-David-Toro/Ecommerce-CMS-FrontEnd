# E-commerce CMS - Frontend

Storefront and admin frontend of the e-commerce platform. It talks to the Spring Boot API in
[API-REST-JAVA-ECOMMERCE](https://github.com/Jhon-David-Toro/API-REST-JAVA-ECOMMERCE).

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
  components/
    ui/                    generic building blocks (Button, Select, Rating, ...)
    patterns/              domain components (ProductCard, Pagination, Filters, ...)
    sections/              page-level sections (Hero, Navbar, Products, ...)
  lib/                     code shared by several components, grouped by domain
    catalog/               product types, filters store, data urls
    shared/                classnames, dom hooks, http, collections
    site/                  menu and footer data
  styles/                  design tokens, mixins and global styles
  test/                    test setup and mocks
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
