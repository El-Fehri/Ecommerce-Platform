// User Types
export interface User {
  id: number
  name: string
  email: string
  avatar?: string | null
  phone?: string | null
  email_verified_at?: string | null
  created_at: string
  updated_at: string
}

export interface UserRole {
  id: number
  name: string
  guard_name: string
}

export interface UserPermission {
  id: number
  name: string
  guard_name: string
}

// Product Types
export interface Product {
  id: number
  sku: string
  name: string
  slug: string
  description?: string | null
  short_description?: string | null
  price: number
  compare_price?: number | null
  cost?: number | null
  stock: number
  min_stock: number
  track_inventory: boolean
  status: 'draft' | 'active' | 'archived'
  published_at?: string | null
  images: ProductImage[]
  categories: Category[]
  brand?: Brand | null
  variants: ProductVariant[]
  attributes: ProductAttribute[]
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: number
  product_id: number
  url: string
  alt?: string | null
  sort_order: number
  is_primary: boolean
}

export interface ProductVariant {
  id: number
  product_id: number
  sku: string
  price: number
  compare_price?: number | null
  stock: number
  attributes: Record<string, string>
}

export interface ProductAttribute {
  id: number
  name: string
  values: string[]
}

// Category Types
export interface Category {
  id: number
  parent_id?: number | null
  name: string
  slug: string
  description?: string | null
  image?: string | null
  sort_order: number
  is_active: boolean
  children?: Category[]
}

// Brand Types
export interface Brand {
  id: number
  name: string
  slug: string
  logo?: string | null
  description?: string | null
  is_active: boolean
}

// Cart Types
export interface Cart {
  id: number
  user_id?: number | null
  session_id: string
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
  item_count: number
}

export interface CartItem {
  id: number
  cart_id: number
  product_id: number
  variant_id?: number | null
  quantity: number
  price: number
  total: number
  product: Product
  variant?: ProductVariant | null
}

// Order Types
export interface Order {
  id: number
  order_number: string
  user_id?: number | null
  status: OrderStatus
  subtotal: number
  shipping_cost: number
  tax: number
  discount: number
  total: number
  currency: string
  payment_status: PaymentStatus
  payment_method?: string | null
  shipping_address: Address
  billing_address: Address
  notes?: string | null
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  variant_id?: number | null
  quantity: number
  price: number
  total: number
  product?: Product
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'returned'

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'

// Address Types
export interface Address {
  id?: number
  first_name: string
  last_name: string
  company?: string | null
  address_line_1: string
  address_line_2?: string | null
  city: string
  state?: string | null
  postal_code: string
  country: string
  phone?: string | null
  is_default?: boolean
}

// Affiliate Types
export interface Affiliate {
  id: number
  user_id: number
  referral_code: string
  commission_rate: number
  status: 'pending' | 'active' | 'suspended'
  total_earnings: number
  paid_earnings: number
  pending_earnings: number
  user: User
}

export interface AffiliateReferral {
  id: number
  affiliate_id: number
  referred_user_id?: number | null
  order_id?: number | null
  commission_amount: number
  status: 'pending' | 'approved' | 'paid' | 'rejected'
  paid_at?: string | null
  created_at: string
}

// Tenant Types
export interface Tenant {
  id: number
  name: string
  slug: string
  domain?: string | null
  logo?: string | null
  branding_colors?: Record<string, string> | null
  status: 'active' | 'suspended' | 'expired'
  subscription_plan_id?: number | null
  trial_ends_at?: string | null
  expires_at?: string | null
  created_at: string
  updated_at: string
}

export interface SubscriptionPlan {
  id: number
  name: string
  slug: string
  price: number
  interval: 'monthly' | 'yearly' | 'lifetime'
  features: string[]
  limits: Record<string, number>
  is_active: boolean
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message?: string
  errors?: Record<string, string[]>
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
  remember: boolean
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  password_confirmation: string
  terms_accepted: boolean
}

export interface ForgotPasswordForm {
  email: string
}

export interface ResetPasswordForm {
  token: string
  email: string
  password: string
  password_confirmation: string
}

// Common Types
export interface MediaFile {
  id: number
  url: string
  type: 'image' | 'video' | 'document'
  size: number
  mime_type: string
}

export interface Notification {
  id: number
  type: string
  title: string
  body: string
  data: Record<string, unknown>
  read_at?: string | null
  created_at: string
}

export interface Review {
  id: number
  product_id: number
  user_id: number
  rating: number
  title?: string | null
  comment?: string | null
  is_verified_purchase: boolean
  is_approved: boolean
  user: User
  created_at: string
}

export interface Coupon {
  id: number
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_purchase?: number | null
  max_discount?: number | null
  usage_limit?: number | null
  used_count: number
  starts_at: string
  expires_at?: string | null
  is_active: boolean
}
