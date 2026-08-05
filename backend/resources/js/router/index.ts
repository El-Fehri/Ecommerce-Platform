import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/shop/HomeView.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('@/views/shop/ShopView.vue'),
    meta: { title: 'Shop' },
  },
  {
    path: '/product/:slug',
    name: 'product-detail',
    component: () => import('@/views/shop/ProductDetailView.vue'),
    meta: { title: 'Product Details' },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/cart/CartView.vue'),
    meta: { title: 'Shopping Cart' },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/checkout/CheckoutView.vue'),
    meta: { title: 'Checkout', requiresAuth: true },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/account/AccountView.vue'),
    meta: { title: 'My Account', requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'account-profile',
        component: () => import('@/views/account/ProfileView.vue'),
      },
      {
        path: 'orders',
        name: 'account-orders',
        component: () => import('@/views/account/OrdersView.vue'),
      },
      {
        path: 'addresses',
        name: 'account-addresses',
        component: () => import('@/views/account/AddressesView.vue'),
      },
      {
        path: 'wishlist',
        name: 'account-wishlist',
        component: () => import('@/views/account/WishlistView.vue'),
      },
    ],
  },
  {
    path: '/affiliate',
    name: 'affiliate',
    component: () => import('@/views/affiliate/AffiliateDashboardView.vue'),
    meta: { title: 'Affiliate Dashboard', requiresAuth: true },
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { title: 'Login', guestOnly: true },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: { title: 'Register', guestOnly: true },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/auth/ForgotPasswordView.vue'),
        meta: { title: 'Forgot Password', guestOnly: true },
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/auth/ResetPasswordView.vue'),
        meta: { title: 'Reset Password', guestOnly: true },
      },
      {
        path: 'verify-email',
        name: 'verify-email',
        component: () => import('@/views/auth/VerifyEmailView.vue'),
        meta: { title: 'Verify Email', requiresAuth: true },
      },
      {
        path: 'two-factor',
        name: 'two-factor',
        component: () => import('@/views/auth/TwoFactorView.vue'),
        meta: { title: 'Two Factor Authentication', guestOnly: true },
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/views/admin/DashboardView.vue'),
        meta: { title: 'Admin Dashboard' },
      },
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('@/views/admin/products/ProductsView.vue'),
        meta: { title: 'Products' },
      },
      {
        path: 'products/create',
        name: 'admin-products-create',
        component: () => import('@/views/admin/products/ProductFormView.vue'),
        meta: { title: 'Create Product' },
      },
      {
        path: 'products/:id/edit',
        name: 'admin-products-edit',
        component: () => import('@/views/admin/products/ProductFormView.vue'),
        meta: { title: 'Edit Product' },
      },
      {
        path: 'categories',
        name: 'admin-categories',
        component: () => import('@/views/admin/categories/CategoriesView.vue'),
        meta: { title: 'Categories' },
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/views/admin/orders/OrdersView.vue'),
        meta: { title: 'Orders' },
      },
      {
        path: 'customers',
        name: 'admin-customers',
        component: () => import('@/views/admin/customers/CustomersView.vue'),
        meta: { title: 'Customers' },
      },
      {
        path: 'affiliates',
        name: 'admin-affiliates',
        component: () => import('@/views/admin/affiliates/AffiliatesView.vue'),
        meta: { title: 'Affiliates' },
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('@/views/admin/settings/SettingsView.vue'),
        meta: { title: 'Settings' },
      },
    ],
  },
  {
    path: '/tenant',
    name: 'tenant',
    component: () => import('@/layouts/TenantLayout.vue'),
    meta: { requiresAuth: true, requiresTenantAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'tenant-dashboard',
        component: () => import('@/views/tenant/DashboardView.vue'),
        meta: { title: 'Tenant Dashboard' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundView.vue'),
    meta: { title: 'Page Not Found' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || 'SaaS E-Commerce'} - SaaS E-Commerce Platform`
  next()
})

export default router
