import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    
    // Add auth token if available
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    
    // Add X-Requested-With header for Laravel
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      
      // Clear auth state
      authStore.clearToken()
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Forbidden: You do not have permission to access this resource')
    }
    
    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found')
    }
    
    // Handle 422 Unprocessable Entity (Validation errors)
    if (error.response?.status === 422) {
      const data = error.response.data as Record<string, unknown>
      if (data.errors) {
        console.error('Validation errors:', data.errors)
      }
    }
    
    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error occurred')
    }
    
    return Promise.reject(error)
  }
)

// API service methods
export const api = {
  // GET request
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.get<T>(url, config)
  },

  // POST request
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.post<T>(url, data, config)
  },

  // PUT request
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.put<T>(url, data, config)
  },

  // PATCH request
  patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.patch<T>(url, data, config)
  },

  // DELETE request
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.delete<T>(url, config)
  },

  // Upload file
  upload<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return apiClient.post<T>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Download file
  download(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    return apiClient.get(url, {
      ...config,
      responseType: 'blob',
    }).then(response => response.data as Blob)
  },
}

// Auth API calls
export const authApi = {
  login(email: string, password: string, remember: boolean = false) {
    return api.post('/v1/auth/login', { email, password, remember })
  },

  register(data: Record<string, unknown>) {
    return api.post('/v1/auth/register', data)
  },

  logout() {
    return api.post('/v1/auth/logout')
  },

  me() {
    return api.get('/v1/auth/me')
  },

  forgotPassword(email: string) {
    return api.post('/v1/auth/forgot-password', { email })
  },

  resetPassword(token: string, email: string, password: string, passwordConfirmation: string) {
    return api.post('/v1/auth/reset-password', {
      token,
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
  },

  verifyEmail(token: string) {
    return api.get(`/v1/auth/verify-email/${token}`)
  },

  resendVerificationEmail() {
    return api.post('/v1/auth/resend-verification-email')
  },
}

// Products API calls
export const productsApi = {
  list(params?: Record<string, unknown>) {
    return api.get('/v1/products', { params })
  },

  show(slug: string) {
    return api.get(`/v1/products/${slug}`)
  },

  search(query: string, params?: Record<string, unknown>) {
    return api.get('/v1/search', { params: { q: query, ...params } })
  },

  categories() {
    return api.get('/v1/categories')
  },

  brands() {
    return api.get('/v1/brands')
  },
}

// Cart API calls
export const cartApi = {
  get() {
    return api.get('/v1/cart')
  },

  addItem(productId: number, quantity: number, variantId?: number) {
    return api.post('/v1/cart/items', { product_id: productId, quantity, variant_id: variantId })
  },

  updateItem(itemId: number, quantity: number) {
    return api.put(`/v1/cart/items/${itemId}`, { quantity })
  },

  removeItem(itemId: number) {
    return api.delete(`/v1/cart/items/${itemId}`)
  },

  clear() {
    return api.delete('/v1/cart/clear')
  },
}

// Orders API calls
export const ordersApi = {
  list(params?: Record<string, unknown>) {
    return api.get('/v1/orders', { params })
  },

  show(orderNumber: string) {
    return api.get(`/v1/orders/${orderNumber}`)
  },

  create(data: Record<string, unknown>) {
    return api.post('/v1/orders', data)
  },

  requestReturn(orderNumber: string, reason: string, items: number[]) {
    return api.post(`/v1/orders/${orderNumber}/return`, { reason, items })
  },

  downloadInvoice(orderNumber: string) {
    return api.download(`/v1/orders/${orderNumber}/invoice`)
  },
}

// Affiliate API calls
export const affiliateApi = {
  dashboard() {
    return api.get('/v1/affiliate/dashboard')
  },

  referrals(params?: Record<string, unknown>) {
    return api.get('/v1/affiliate/referrals', { params })
  },

  withdraw(amount: number, method: string) {
    return api.post('/v1/affiliate/withdraw', { amount, method })
  },

  generateReferralCode() {
    return api.post('/v1/affiliate/generate-code')
  },
}

// Admin API calls
export const adminApi = {
  dashboard() {
    return api.get('/admin/dashboard')
  },

  analytics(params?: Record<string, unknown>) {
    return api.get('/admin/analytics', { params })
  },

  // Products
  products(params?: Record<string, unknown>) {
    return api.get('/admin/products', { params })
  },

  createProduct(data: Record<string, unknown>) {
    return api.post('/admin/products', data)
  },

  updateProduct(id: number, data: Record<string, unknown>) {
    return api.put(`/admin/products/${id}`, data)
  },

  deleteProduct(id: number) {
    return api.delete(`/admin/products/${id}`)
  },

  // Orders
  orders(params?: Record<string, unknown>) {
    return api.get('/admin/orders', { params })
  },

  updateOrderStatus(id: number, status: string) {
    return api.patch(`/admin/orders/${id}/status`, { status })
  },

  // Customers
  customers(params?: Record<string, unknown>) {
    return api.get('/admin/customers', { params })
  },

  // Affiliates
  affiliates(params?: Record<string, unknown>) {
    return api.get('/admin/affiliates', { params })
  },

  approveAffiliate(id: number) {
    return api.post(`/admin/affiliates/${id}/approve`)
  },

  suspendAffiliate(id: number) {
    return api.post(`/admin/affiliates/${id}/suspend`)
  },
}

export default api
