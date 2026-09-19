# NikeShop — Ivana Ivanović

An online store for Nike footwear and sportswear. Customers browse and buy as guests;
an admin manages the catalogue and orders through a dedicated panel.

The project is a **Laravel 12 REST API** ([`Backend/`](Backend)) and an
**Angular 20 single-page app** ([`Frontend/`](Frontend)).

## Features

**Storefront (guest — no account needed)**
- Browse products; search by name, filter by category, sort by price / newest
- Product variants (size × colour) with stock-aware "add to cart"
- Cart persisted in the browser; subtotal, shipping and total computed on the server
- Checkout (shipping details + payment method), order summary and confirmation

**Admin panel** (`/admin-panel`, login required)
- Dashboard: stat cards, revenue chart and recent activity (ranges: 24h / 12w / YTD)
- Products CRUD with image upload and variant/stock management
- Manage categories, sizes and colours
- Orders: list, detail, status changes (customer notified by email), PDF invoice

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | Angular 20 (NgModules), TypeScript, RxJS, Angular Material 20, Bootstrap 5 |
| Backend | Laravel 12 REST API, Domain-Driven structure (`app/Domains`), Sanctum auth |
| Database | MySQL (relational; migrations under `Backend/database/migrations`) |
| Tooling | Docker via Laravel Sail, DomPDF (invoices), Mailpit (local email) |

## Prerequisites

- Node.js 18+ and npm
- Docker (for the recommended Sail setup) **or** PHP 8.2+ and Composer for a local backend

## Getting started

### 1. Backend (terminal 1)

```bash
cd Backend
cp .env.example .env
```

**With Docker (recommended):**
```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail artisan storage:link
```

**Without Docker:**
```bash
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

The API is served at `http://localhost:80/api` (Sail) or `http://localhost:8000/api`
(`php artisan serve`). Local mail is caught by **Mailpit** at `http://localhost:8025`.

### 2. Frontend (terminal 2)

```bash
cd Frontend
npm install --legacy-peer-deps      # the peer-dep flag is required
npm run start:dev                   # dev server + API proxy
# or: npm start   (plain ng serve, no proxy)
```

App runs at `http://localhost:4200/`. The API base URL is configured in
`Frontend/src/app/shared/environment/environment.ts`.

> **Admin login:** `ivana@gmail.com` / `ivana123`

## Project layout

```
NikeShop/
├── Frontend/         # Angular 20 SPA (storefront + admin panel)
│   └── src/app/      # home, shop, cart, process-order, login, admin, layout, shared
├── Backend/          # Laravel 12 API
│   └── app/Domains/  # Auth, Product, Order, Notification (DDD)
└── README.md
```

## Database

13 tables. Catalogue: `products`, `categories`, `sizes`, `colors`, `product_variants`
(size × colour + stock), `products_categories`. Orders: `orders`, `order_items`. Auth:
`admins`, `personal_access_tokens`. System: `jobs`, `failed_jobs`, `notifications`.

## Deployment

In production the Angular build is served by the Laravel backend as a single
same-origin app: `Backend/scripts/build-frontend.sh` compiles the SPA into
`Backend/public/`, and a catch-all route in `Backend/routes/web.php` serves it for any
non-`/api` path (so `environment.prod.ts` calls `/api` with no CORS).
