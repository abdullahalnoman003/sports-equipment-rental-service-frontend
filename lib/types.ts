export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN"
export type UserStatus = "ACTIVE" | "SUSPENDED" | "INACTIVE"
export type RentalStatus = "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELED"
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED"
export type PaymentProvider = "STRIPE" | "SSLCOMMERZ"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  createdAt: string
  updatedAt: string
  status: UserStatus
}

export interface Profile {
  id: string
  profile_picture: string | null
  address: string | null
  phone_number: string | null
  createdAt: string
  updatedAt: string
  user_id: string
}

export interface UserProfile extends User {
  profile: Profile | null
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface Gear {
  id: string
  name: string
  description: string
  image: string | null
  brand: string
  provider_email: string
  price: number
  quantity: number
  createdAt: string
  updatedAt: string
  category_Name: string
  provider_id: string
}

export interface GearWithUser extends Gear {
  user?: { name: string; email: string }
}

export interface Rental {
  id: string
  user_id: string
  gear_id: string
  start_date: string
  end_date: string
  status: RentalStatus
  created_at: string
  updated_at: string
  total_price: number
  gear: Gear
  user: { id: string; name: string; email: string; status?: UserStatus }
}

export interface RentalWithPayment extends Rental {
  payment: Payment | null
}

export interface Payment {
  id: string
  rental_id: string
  transaction_id: string
  amount: number
  provider: PaymentProvider
  status: PaymentStatus
  paid_at: string | null
  created_at: string
  customerId: string
  rental?: Rental
}

export interface Review {
  id: string
  user_id: string
  gear_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}
