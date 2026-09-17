# Kenakata

A storefront capstone built on the [Platzi Fake Store API](https://fakeapi.platzi.com/) — catalogue browsing, cart, checkout, authentication, and a small admin area, in Next.js 16 (App Router) with React 19.

**Live deployment:** _add your deployment url here once I7's build is deployed._

---

## Overview

Kenakata is a fictional storefront for Bangladesh (`৳` pricing, bKash/Nagad/Rocket payment options, delivery estimates in Dhaka). It's built against a real, shared, public demo API rather than a mock server, which shapes several decisions documented below — most importantly that **the API enforces none of the authorization the app implements**. See [Known limitations](#known-limitations).

What's implemented:

- **Catalogue** — home page, category index and detail, search, product detail — all server-rendered with a mix of ISR and SSG.
- **Cart & checkout** — a `localStorage`-backed cart, a validated checkout form (React Hook Form + Zod), a mock payment flow, and order tracking.
- **Auth** — cookie-based sessions against the API's JWT endpoints, server actions for login/register/logout, and middleware-enforced route protection with token refresh.

## Setup

```bash
pnpm install
cp .env.example .env   # optional — see Environment variables below
pnpm dev
```

Open `http://localhost:3000`. The app talks to the public Platzi API by default, so there's nothing else to run — no database, no seed script.

**Demo credentials** (seeded on the API, not created by this app): `john@mail.com` / `changeme`. To sign in as an admin, look up a user with `"role":"admin"` via `GET https://api.escuelajs.co/api/v1/users` — the API returns passwords in plain text, which is one more reminder this is a demo backend, not a real one.

### Scripts

| Command                       | Does                       |
| ----------------------------- | -------------------------- |
| `pnpm dev`                    | Dev server                 |
| `pnpm build`                  | Production build           |
| `pnpm start`                  | Serve the production build |
| `pnpm lint` / `pnpm lint:fix` | ESLint                     |
| `pnpm format`                 | Prettier                   |

### Environment variables

| Variable | Default (in `lib/env.ts`)         | Used for                         |
| -------- | --------------------------------- | -------------------------------- |
| `API`    | `https://api.escuelajs.co/api/v1` | Every API call in `lib/api/*.ts` |

Both have working fallbacks, so the app runs with an empty `.env`. `.env.example` documents them; `.env` itself stays gitignored. Set `SITE_URL` to your real deployment url once you have one — it's the difference between a sitemap full of correct urls and one full of placeholders.

No secrets live in environment variables here: the API is public and unauthenticated for reads, and the JWT tokens the app does handle are per-user and live in httpOnly cookies, never in env.

---

## Architecture

```text
src/
├── app/                  # Routes (App Router). Mirrors the url structure.
│   ├── (auth)/           # /login, /register — a route group, no url segment
│   ├── account/          # Session-gated, middleware + layout guard
│   ├── category/, product/, search/   # Catalogue
│   ├── cart/, checkout/, track/, wishlist/
│   └── layout.tsx
├── components/
│   ├── ui/               # Button, Field, Breadcrumbs, Pagination, Skeleton, StatusPanel
│   ├── product/, cart/, account/, admin/, header/, footer/, home/
│   └── utilities/        # UContainer, UHeader, UMain, UFooter, USection, constants
├── hooks/useCart.ts       # Read side of the cart store
├── lib/
│   ├── api/               # One file per resource, all through client.ts's request()
│   ├── cart-store.ts, orders.ts   # localStorage-backed, useSyncExternalStore
│   ├── sort.ts, format.ts, image.ts, product.ts, cart-total.ts
│   ├── schemas/            # Zod: auth, checkout, product, category
│   ├── session.ts, auth-cookies.ts
│   └── env.ts
├── middleware.ts
└── types/                 # Ambient global types — no import/export
```

### Data flow

Every API call goes through `lib/api/client.ts`'s `request<T>()`, which centralizes the fetch, the error type (`ApiError`), and the caching policy: catalogue reads pass `{ next: { revalidate } }`, user-specific reads pass `cache: 'no-store'`, and every write (`createProduct`, `login`, etc.) passes `revalidate: false` explicitly. `lib/api/safe.ts` wraps the catalogue reads in try/catch for sections that shouldn't take the whole page down (the home page strips, the header's nav categories); detail pages keep the throwing versions so `notFound()` and `error.tsx` can do their job.

### State that isn't server state

Two independent `localStorage`-backed stores, both following the same shape (module-level cached snapshot, `useSyncExternalStore`, cross-tab sync via the `storage` event):

- **Cart & wishlist** (`lib/cart-store.ts`) — read through `useCart()`.
- **Orders** (`lib/orders.ts`) — the API has no orders endpoint, so a placed order is written here and read back by `/account/orders` and `/track`.

Both cache their snapshot rather than recomputing it on every `getSnapshot()` call. This isn't a style choice — `useSyncExternalStore` compares snapshots with `Object.is` on every render, and a `getSnapshot` that reads and re-parses `localStorage` each time returns a new array reference every call, which React reads as a permanent store change and re-renders forever. This exact bug shipped once during development (`orders.ts`'s first version) and the fix is recorded in the Challenges section below.

## Challenges

- **The `useSyncExternalStore` snapshot bug.** The orders store's first version parsed `localStorage` fresh inside `getSnapshot()`. `useSyncExternalStore` compares snapshots with `Object.is` on every render; a fresh array every call reads as a permanent external change, and React re-renders in a loop (visible as React's own dev warning: _"The result of getSnapshot should be cached"_). The fix — a module-level cached snapshot updated only on write, mirroring the cart store's existing pattern — is now a direct regression test in `lib/__tests__/orders.test.ts`.
- **Cookie lifetimes that don't match the API's real token lifetimes** silently produce a session that expires early or late depending on which one is wrong. The Platzi API issues a 20-day access token and a 10-hour refresh token — the reverse of the usual arrangement — and assuming the usual arrangement instead of checking is exactly how this kind of bug ships.
- **`cn`'s role.** Early in the project it looked safe to skip installing the real `cn` (clsx + tailwind-merge) in favor of the `cn` npm package doing naive concatenation, on the theory that few components would need real conflict resolution. Several genuine conflict cases turned up later (`cn(inputVariants(), 'w-28')` in the toolbar, `cn(buttonVariants(), 'rounded-full')` for a pill button) — worth flagging as a decision that looked cheap early and stopped being cheap the moment cva base classes and override classes started colliding.
- **The demo API's category delete** fails with a bare 400 when products are still filed under it, with no message distinguishing that from a malformed request or a server outage — solved by guessing the likely cause in the admin UI's error text rather than surfacing the API's opaque response directly.

## Known limitations

- **The API enforces none of this app's authorization.** Product, category, and user writes succeed from anyone with network access, with or without a valid token — this app's login wall and role guard protect its own surface, not the underlying data. Anyone with `curl` and the API's base url can write to the same database this admin area does.
- **No real payment processing.** Checkout's "Processing payment…" state is a 1.2-second `setTimeout`; no payment gateway is integrated.
- **Order tracking is simulated.** Delivery stages advance based on elapsed time since the order was placed, not a real courier integration.
- **Shared public data.** Every product, category, and user visible in this app is visible to everyone else using the same Platzi API instance, and the underlying dataset is reset periodically by its maintainers.

## Future improvements

- Component/integration tests for `CheckoutForm`, `AuthForm`, and the admin forms (Testing Library + user-event), and an E2E smoke test (Playwright) across sign in → add to cart → checkout.
- A real orders backend, once one exists, replacing the `localStorage` order store without changing `OrdersList`'s or `TrackForm`'s public shape.
- Address book under `/account/addresses` (currently an honest empty state — nothing persists an address today).
- Bundle-size auditing beyond the `optimizePackageImports` hint — a real `@next/bundle-analyzer` pass once there's a production bundle worth analyzing.
- Rate limiting or a proxy in front of the admin write actions, since the underlying API has none.
