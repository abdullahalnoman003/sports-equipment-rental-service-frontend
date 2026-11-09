<div align="center">

# GearUp

**A peer-to-peer sports and outdoor equipment rental marketplace**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Features](#features) · [Demo Credentials](#demo-credentials) · [AI Features](#ai-features) · [Getting Started](#getting-started) · [Architecture](#architecture) · [API Reference](#api-reference) · [Environment Variables](#environment-variables) · [Contributing](#contributing)

</div>

---

GearUp connects equipment owners with outdoor enthusiasts, athletes, and adventure seekers through a modern rental marketplace. Providers list their gear (bicycles, camping tents, cricket bats, fitness equipment) and customers browse, book by the day, and pay securely through Stripe.

Built with **Next.js 16**, **React 19 Server Components**, and **Tailwind CSS v4**, the application delivers fast initial page loads, SEO-optimized server rendering, and a responsive interface across all device sizes.

## Features

**Gear Discovery**
- Full-text search with real-time filtering by category, brand, and price range
- Nine equipment categories: Cycling, Camping, Fitness, Water Sports, Hiking, Football, Cricket, Tennis, and more
- Detailed gear pages with pricing, availability, gallery, reviews, and provider information

**Accounts & Access**
- Three roles (customer, provider, admin) with role-gated dashboards
- Route protection in `proxy.ts`: guests are redirected to login, wrong roles are redirected home
- One-click demo sign-in for each role, with credentials resolved on the server
- Google sign-in when `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is configured
- Profile editing with avatar, phone, and address

**Rental & Payments**
- Date-range booking with automatic daily-rate price calculation
- Integrated Stripe Checkout for secure payment processing
- Complete order lifecycle tracking from placement through return

**Provider Dashboard**
- Create, edit, and manage equipment listings with external image URLs
- Process rental orders through each fulfillment stage
- Revenue and inventory analytics at a glance

**Admin Dashboard**
- User account management with status controls (active / suspended)
- Platform-wide gear and rental transaction oversight
- Category management with CRUD operations

**AI Features**
- AI search suggestions that appear as you type, backed by the live catalog
- Personalised gear recommendations ranked from your own rental history
- AI chat assistant that answers renting questions using real catalog data
- Graceful degradation: every AI feature falls back to a deterministic local
  implementation, so nothing breaks when the API is unavailable

**Design & UX**
- Dark / light / system theme switching with zero-flash hydration
- Responsive layout optimized for desktop, tablet, and mobile
- Custom animation system with fade-up, float, shimmer, and pulse micro-interactions
- Lora typography from Google Fonts

## Demo Credentials

The login page has one-click **Customer**, **Provider** and **Admin** buttons that sign you in
instantly. The credentials are resolved on the server, so the browser never receives them.

| Role | Email | Password | What to look at |
|---|---|---|---|
| Customer | `noman2@gmail.com` | `thisisasecurepassword` | Rental history, spending charts, payments |
| Provider | `noman6@gmail.com` | `thisisasecurepassword` | Listings, incoming orders, earnings |
| Admin | `admin@gmail.com` | `admin@123` | Full oversight, analytics, user and category management |

Google sign-in also works when `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set to a client ID that matches the backend, so you can sign in with any Google account instead.

These accounts are pre-seeded with real data so the dashboards are worth exploring. Do not enter
real personal information.

## Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | ≥ 18.18 |
| pnpm | ≥ 9 |
| GearUp Backend API | Running at `http://localhost:5000` |

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/gearup-frontend.git
cd gearup-frontend

# Install dependencies
pnpm install

# Configure environment (`.env` and `.env.local` are both gitignored and loaded)
cp .env.example .env.local
```

Edit `.env.local` (or `.env`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

`NEXT_PUBLIC_API_URL` is not in the template because the client already defaults
to `http://localhost:5000`. The template covers demo logins, Google sign-in, and
the optional AI provider keys; every one of them can be left blank.

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Create optimized production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint (flat config) |

There is no test or typecheck script. `pnpm build` performs the TypeScript check,
and `pnpm lint` is the only other verification step.

## Architecture

### Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org/) | App Router, Server Components, Server Actions |
| UI | [React 19](https://react.dev/) | Component rendering and state management |
| Language | [TypeScript 5](https://www.typescriptlang.org/) | Static typing across the entire codebase |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS with `@theme` inline configuration |
| Components | [shadcn/ui](https://ui.shadcn.com/) | Accessible primitives built on Radix UI |
| Payments | [Stripe](https://stripe.com/) | Checkout session creation and webhook fulfillment |
| Route protection | `proxy.ts` | JWT role gating before render (Next.js 16 replacement for middleware) |
| AI | Multi-provider LLM chain | Optional search suggestions, recommendations, and chat over the live catalog |
| Icons | [Lucide React](https://lucide.dev/) | Consistent SVG icon set |
| Validation | [Zod](https://zod.dev/) | Runtime schema validation |
| Notifications | [React Hot Toast](https://react-hot-toast.com/) | Lightweight toast system |

### Project Structure

```
gearup-frontend/
├── app/
│   ├── (publicSection)/           # Home, gear catalog, content pages, payment result
│   ├── (customerSection)/         # Customer dashboard, orders, payments
│   ├── (providerSection)/         # Provider dashboard, gear management, order processing
│   ├── (adminSection)/            # Admin dashboard, users, gear audit, rentals, categories, analytics
│   ├── (authentication)/          # Login, register
│   ├── (profileSection)/          # User profile
│   ├── layout.tsx                 # Root layout: theme provider, Lora font, nav progress, toaster
│   ├── globals.css                # Tailwind v4 theme tokens and custom animations
│   ├── error.tsx                  # Global error boundary
│   ├── not-found.tsx              # Custom 404 page
│   └── loading.tsx                # Global loading skeleton
│
├── components/
│   ├── ui/                        # shadcn/ui primitives (button, card, dialog, table, etc.)
│   ├── shared/                    # Navbar, footer, dashboard layout, chart kit, status badge
│   ├── home/                      # Hero, stats, features, featured gear, FAQ, CTA
│   └── ai/                        # Search suggestions, recommendation panel, chat assistant
│
├── content/
│   └── blog.ts                    # Static blog posts (slug, body, metadata)
│
├── lib/
│   ├── types.ts                   # Domain models: User, Gear, Rental, Payment, Review
│   ├── utils.ts                   # cn() class merge helper
│   ├── text.ts                    # Dash-free text normalisation for the whole site
│   ├── brand.ts                   # Three-accent brand palette helpers
│   ├── grid.ts                    # Full-row grid helpers for landing sections
│   ├── seo.ts                     # OpenGraph and metadata helpers
│   ├── get-token.ts               # Server-side cookie token reader
│   ├── demo-accounts.ts           # Demo role list (credentials stay on the server)
│   ├── gear-images.ts             # Multi-image normalisation for gear galleries
│   ├── reviews.ts                 # Rating summary maths
│   ├── charts.ts                  # Analytics series builders
│   └── ai/                        # Multi-provider LLM chain, prompts, fallbacks
│
├── service/
│   ├── api.ts                     # Centralised fetch client with cookie injection
│   ├── getMe.ts                   # Server action: fetch authenticated user
│   └── logout.ts                  # Server action: clear auth cookies
│
├── proxy.ts                       # Route protection and role gating (Next.js 16 middleware)
├── public/                        # Static assets (logos, favicons)
├── next.config.ts                 # Remote image pattern configuration
├── eslint.config.mjs              # ESLint 9 flat configuration
└── tsconfig.json                  # TypeScript compiler options
```

### Route Groups

Next.js route groups (parenthesized folders) organize code without affecting URL paths:

| Group | URL Pattern | Purpose |
|---|---|---|
| `(publicSection)` | `/`, `/gear`, `/gear/:id`, `/about`, `/blog`, `/blog/:slug`, `/contact`, `/help`, `/how-it-works`, `/careers`, `/privacy`, `/terms`, `/payment/success`, `/payment/cancel` | Public storefront and content |
| `(customerSection)` | `/dashboard/customer/*` | Customer portal |
| `(providerSection)` | `/dashboard/provider/*` | Provider portal |
| `(adminSection)` | `/dashboard/admin/*` | Admin control panel |
| `(authentication)` | `/login`, `/register` | Auth pages |
| `(profileSection)` | `/profile` | Account settings |

Each route group contains:
- `_components/` : page-specific UI components
- `_actions/` : `"use server"` functions wrapping `service/api.ts` calls
- `page.tsx` : async server component that fetches data and composes components

### Rental Order Lifecycle

```
PLACED ──► CONFIRMED ──► PAID ──► PICKED_UP ──► RETURNED
  │                       ▲
  └──► CANCELED           │
                    (Stripe webhook)
```

After a rental reaches `RETURNED`, the customer may submit a verified review (1 to 5 stars).

### Authentication Flow

1. User submits credentials via the login form, picks a one-click demo role, or signs in with Google
2. The backend validates and returns JWT tokens; the `(authentication)` server actions store them as HTTP-only cookies (`accessToken`, `refreshToken`)
3. The JWT payload is decoded to pick the landing dashboard: `ADMIN`, `PROVIDER`, or `CUSTOMER`
4. Server Actions read the token from cookies via `lib/get-token.ts` and forward it to the API client
5. Each section layout calls `getMe()` server-side to render role-appropriate navigation

### Route Protection

`proxy.ts` runs before every non-static request and enforces access:

- **Public routes** (`/`, `/gear`, `/about`, `/blog`, `/contact`, `/help`, `/how-it-works`, `/careers`, `/privacy`, `/terms`, `/payment/*`) are open to everyone.
- **Role routes** map `/dashboard/admin` to `ADMIN`, `/dashboard/provider` to `PROVIDER`, and `/dashboard/customer` to `CUSTOMER`.
- **Guests** hitting any protected route are sent to `/login?redirectTo=<path>`, and are sent home if they visit `/login` or `/register` while signed in.
- **Other routes** not listed as public require a session.

`proxy.ts` only decodes the JWT payload to read the role; it does not verify the signature. The backend remains the source of truth for every protected API call. When adding a new public page, add its path to `PUBLIC_ROUTES` in `proxy.ts` or logged-out visitors will be redirected to login.

### Data Models

| Model | Key Fields | Relationships |
|---|---|---|
| **User** | `id`, `name`, `email`, `role`, `status` | → Profile, → Rentals, → Gears, → Reviews |
| **Profile** | `profile_picture`, `address`, `phone_number` | → User |
| **Gear** | `name`, `brand`, `price`, `quantity`, `category_Name` | → Provider (User), → Rentals, → Reviews |
| **Category** | `name`, `description`, `image` | → Gears |
| **Rental** | `start_date`, `end_date`, `status`, `total_price` | → User, → Gear, → Payment |
| **Payment** | `transaction_id`, `amount`, `provider`, `status` | → Rental |
| **Review** | `rating` (1 to 5), `comment` | → User, → Gear |

## API Reference

The frontend communicates with a RESTful backend through a centralized API client (`service/api.ts`). All authenticated requests include the JWT token via cookie headers.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | None | Create a new customer or provider account |
| `POST` | `/api/auth/login` | None | Authenticate and receive session cookies |
| `POST` | `/api/auth/google` | None | Sign in with a Google ID token (account created on first use) |
| `GET` | `/api/auth/me` | Any | Retrieve authenticated user profile |

### Gear Catalog

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/gear` | None | List gear with optional `brand`, `category`, `minimumPrice`, `maximumPrice` filters |
| `GET` | `/api/gear/:id` | None | Get single gear details |

### Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/category` | None | List all categories |
| `POST` | `/api/category/create-category` | Admin | Create category |
| `PUT` | `/api/category/update-category/:id` | Admin | Update category |
| `DELETE` | `/api/category/delete-category/:id` | Admin | Delete category (fails if gear exists) |

### Rentals

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/rental/create-rental` | Customer | Create rental order (auto-calculates `total_price`) |
| `GET` | `/api/rental/get-rentals` | Customer | List customer's rentals |
| `GET` | `/api/rental/get-rentals/:id` | Customer | Get single rental detail |

### Payments

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/payment/create` | Customer | Initialize Stripe Checkout session |
| `GET` | `/api/payment/` | Customer | List payment history |
| `GET` | `/api/payment/:id` | Customer | Get single payment detail |

### Provider Operations

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/provider/gear` | Provider | Add gear listing |
| `GET` | `/api/provider/gear/getallgear` | Provider | List gear inventory |
| `PUT` | `/api/provider/gear/:id` | Provider | Update gear listing |
| `DELETE` | `/api/provider/gear/:id` | Provider | Remove gear listing |
| `GET` | `/api/provider/orders/` | Provider | List incoming orders |
| `PATCH` | `/api/provider/orders/:id` | Provider | Update order status |

> `GET /api/provider/gear/getallgear` returns every provider's gear, not just the caller's. The provider dashboard filters by `provider_email` client-side.

### Administration

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/users` | Admin | List all users (excludes admins) |
| `PATCH` | `/api/admin/users/:id` | Admin | Update user status |
| `GET` | `/api/admin/gear` | Admin | List all gear platform-wide |
| `GET` | `/api/admin/rentals` | Admin | List all rentals platform-wide |

### Profile & Reviews

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `PUT` | `/api/profile/update-profile` | Any | Update name, avatar, phone, address |
| `GET` | `/api/review?gear_id=:id` | None | List public reviews for a gear item |
| `GET` | `/api/review/summary` | None | Average rating per gear, used by the listing filters |
| `POST` | `/api/review` | Customer | Submit review for a returned rental |

Reviews are only accepted for a `RETURNED` rental, and a customer may review each gear item once.

### Response Format

All endpoints return a consistent JSON envelope:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { }
}
```

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:5000` | Backend REST API base URL (trailing slashes are stripped) |
| `NEXT_PUBLIC_SITE_URL` | No | `http://localhost:3000` | Frontend URL for canonical and OpenGraph metadata |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | none | Google Sign-In client ID. Blank hides the button |
| `NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL` / `_PASSWORD` | No | none | One-click demo customer login. Blank hides the button |
| `NEXT_PUBLIC_DEMO_PROVIDER_EMAIL` / `_PASSWORD` | No | none | One-click demo provider login |
| `NEXT_PUBLIC_DEMO_ADMIN_EMAIL` / `_PASSWORD` | No | none | One-click demo admin login |
| `GEMINI_API_KEY` | No | none | AI provider 1. Blank skips it |
| `GROQ_API_KEY` | No | none | AI provider 2. Blank skips it |
| `OPENROUTER_API_KEY` | No | none | AI provider 3. Blank skips it |
| `NVIDIA_API_KEY` | No | none | AI provider 4. Blank skips it |
| `MISTRAL_API_KEY` | No | none | AI provider 5. Blank skips it |
| `GEMINI_MODEL`, `GROQ_MODEL`, `...` | No | provider defaults | Comma-separated model override, tried in order |

All five AI keys are read only in server actions, so none of them ever reach the
browser. The demo credentials are also read server-side by `demoLoginAction`,
even though their names carry the `NEXT_PUBLIC_` prefix. See
[AI Features](#ai-features) for how the fallback chain works.

## AI Features

Three features, all optional. With no API keys the site still works, because
every feature has a deterministic fallback built over the live catalog rather
than a stub.

| Feature | Where | What it does |
|---|---|---|
| Search suggestions | Browse Gear search box | Suggests completions as you type |
| Personalised recommendations | Home page and customer dashboard | Ranked from your own rental history |
| Chat assistant | Floating button on every public page | Answers renting questions from real catalog data |

### Getting the API keys

Every provider below has a free tier and no card is required. Sign up for as many
as you like: more keys means more redundancy.

| # | Provider | Env var | Get a key |
|---|---|---|---|
| 1 | Google Gemini | `GEMINI_API_KEY` | <https://aistudio.google.com/apikey> |
| 2 | Groq | `GROQ_API_KEY` | <https://console.groq.com/keys> |
| 3 | OpenRouter | `OPENROUTER_API_KEY` | <https://openrouter.ai/keys> |
| 4 | NVIDIA NIM | `NVIDIA_API_KEY` | <https://build.nvidia.com/settings/api-keys> |
| 5 | Mistral | `MISTRAL_API_KEY` | <https://console.mistral.ai/api-keys> |

Recommended setup: add Gemini as the primary and one other, for example Groq or
OpenRouter, as the backup. That is enough for the fallback to do its job.

### How the fallback works

Providers are tried **in the order listed above**. The first that answers wins.

- A provider with no key set is skipped entirely, so you can add keys gradually.
- Each provider carries several models, tried in order, so a retired model
  degrades to the next one instead of becoming an outage.
- A **circuit breaker** trips after two consecutive failures and skips that
  provider for two minutes. Without it, every request would sit through a dead
  provider's timeout before trying the next.
- Each provider is capped at 20 calls per minute and identical prompts are cached
  for 10 minutes, to stay inside the free tiers.
- Which provider answered is returned by the actions but deliberately hidden in the UI, so every feature reads as one GearUp assistant rather than a third-party chatbot.

### Keeping answers on-brand

Every prompt is prefixed with a shared site context in `lib/ai/context.ts`, so
whichever provider ends up answering, it answers **as GearUp**:

- Always calls the platform GearUp, never a generic marketplace.
- Prices in BDT using ৳, matching the rest of the site.
- Grounded in real policies: daily-rate pricing, Stripe payment, the
  PLACED to RETURNED order stages, and the three account roles.
- Only catalog items may be recommended. Anything else is filtered out before it
  can render.
- No em dashes or en dashes, matching the site-wide rule. Output is cleaned again
  on the way out, because models write them regardless of the instruction.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

Please ensure `pnpm lint` passes before submitting.

## License

This project is licensed under the [MIT License](LICENSE).

## 🧑‍💻 Developer

**👨‍🎓 Abdullah Al Noman**  
🔗 [LinkedIn](https://www.linkedin.com/in/abdullahalnoman003) •  
🔗 [Github](https://github.com/abdullahalnoman003) •  

