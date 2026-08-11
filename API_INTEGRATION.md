# API Integration Documentation

This document maps frontend components and pages to their corresponding backend API endpoints.

## Auth (`/api/auth`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `loginAction` | POST | `/api/auth/login` | No |
| `registerAction` | POST | `/api/auth/register` | No |
| `getMe` | GET | `/api/auth/me` | Any role |

## Public Gear (`/api/gear`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `fetchAllGear` | GET | `/api/gear` | No |
| `fetchGearById` | GET | `/api/gear/:id` | No |

## Categories (`/api/category`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `fetchAllCategories` | GET | `/api/category` | No |
| `createCategory` | POST | `/api/category/create-category` | ADMIN |
| `updateCategory` | PUT | `/api/category/update-category/:id` | ADMIN |
| `deleteCategory` | DELETE | `/api/category/delete-category/:id` | ADMIN |

## Provider (`/api/provider`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `addNewGear` | POST | `/api/provider/gear` | PROVIDER |
| `updateGearById` | PUT | `/api/provider/gear/:id` | PROVIDER |
| `removeGearById` | DELETE | `/api/provider/gear/:id` | PROVIDER |
| `fetchProviderGear` | GET | `/api/provider/gear/getallgear` | PROVIDER |
| `fetchProviderOrders` | GET | `/api/provider/orders/` | PROVIDER |
| `updateOrderStatus` | PATCH | `/api/provider/orders/:id` | PROVIDER |

## Rentals (`/api/rental`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `fetchMyRentals` | GET | `/api/rental/get-rentals` | CUSTOMER |
| `fetchRentalDetails` | GET | `/api/rental/get-rentals/:id` | CUSTOMER |
| `createRental` | POST | `/api/rental/create-rental` | CUSTOMER |

## Payments (`/api/payment`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `createPaymentSession` | POST | `/api/payment/create` | CUSTOMER |
| `fetchPaymentHistory` | GET | `/api/payment/` | CUSTOMER |
| `fetchPaymentById` | GET | `/api/payment/:id` | CUSTOMER |

## Admin (`/api/admin`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `fetchAllUsers` | GET | `/api/admin/users` | ADMIN |
| `setUserStatus` | PATCH | `/api/admin/users/:id` | ADMIN |
| `fetchAllGear` | GET | `/api/admin/gear` | ADMIN |
| `fetchAllRentals` | GET | `/api/admin/rentals` | ADMIN |

## Profile (`/api/profile`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `updateUserProfile` | PUT | `/api/profile/update-profile` | Any role |

## Reviews (`/api/review`)

| Frontend Action | Method | Endpoint | Auth |
|-----------------|--------|----------|------|
| `submitReview` | POST | `/api/review` | CUSTOMER |

---

## Component-to-Action Mapping

### Public Pages
| Page | Components | Actions Used |
|------|-----------|--------------|
| `/` (Home) | Hero, Features, Services, Testimonials, FAQ, CTA | None |
| `/gear` | GearClient, GearCard, GearFilters | `fetchAllGear`, `fetchAllCategories` |
| `/gear/[id]` | GearDetailClient, RentForm | `fetchGearById`, `createRental` |
| `/payment/success` | PaymentSuccessPage | None (static) |
| `/payment/cancel` | PaymentCancelPage | None (static) |

### Authentication Pages
| Page | Components | Actions Used |
|------|-----------|--------------|
| `/login` | LoginForm | `loginAction` |
| `/register` | RegisterForm | `registerAction` |

### Customer Dashboard
| Page | Components | Actions Used |
|------|-----------|--------------|
| `/dashboard/customer` | StatsCards, RecentRentals, RecentPayments | `fetchMyRentals`, `fetchPaymentHistory` |
| `/dashboard/customer/orders` | CustomerOrdersClient, OrdersTable | `fetchMyRentals` |
| `/dashboard/customer/orders/[id]` | OrderDetailClient, OrderTimeline, PaymentCard, ReviewForm | `fetchRentalDetails`, `createPaymentSession`, `submitReview` |
| `/dashboard/customer/payments` | PaymentsTable | `fetchPaymentHistory` |
| `/profile` | ProfileForm | `getMe`, `updateUserProfile` |

### Provider Dashboard
| Page | Components | Actions Used |
|------|-----------|--------------|
| `/dashboard/provider` | StatsCards, GearList, OrdersList | `fetchProviderGear`, `fetchProviderOrders` |
| `/dashboard/provider/gear` | ProviderGearClient, GearTable | `fetchProviderGear` |
| `/dashboard/provider/gear/new` | AddGearForm | `addNewGear`, `fetchAllCategories` |
| `/dashboard/provider/gear/[id]` | EditGearForm | `updateGearById`, `fetchAllCategories` |
| `/dashboard/provider/orders` | ProviderOrdersClient, OrdersTable | `fetchProviderOrders`, `updateOrderStatus` |

### Admin Dashboard
| Page | Components | Actions Used |
|------|-----------|--------------|
| `/dashboard/admin` | StatsCards, RecentUsers, RecentRentals | `fetchAllUsers`, `fetchAllRentals` |
| `/dashboard/admin/users` | AdminUsersClient, UsersTable | `fetchAllUsers`, `setUserStatus` |
| `/dashboard/admin/gear` | GearTable | `fetchAllGear` |
| `/dashboard/admin/rentals` | RentalsTable | `fetchAllRentals` |
| `/dashboard/admin/categories` | CategoriesTable, CategoryForm | `fetchAllCategories`, `createCategory`, `updateCategory`, `deleteCategory` |

---

## API Client Configuration

- **Base URL**: `http://localhost:5000` (default) or `NEXT_PUBLIC_API_URL` env var
- **Auth**: Token passed as `Cookie: accessToken=${token}` header
- **Response shape**: `{ success: boolean, statusCode: number, message: string, data: T }`
