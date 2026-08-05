--- backend/resources/js/views/shop/HomeView.vue (原始)
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Home Shop</h1>
    <p>Welcome to our e-commerce platform!</p>
  </div>
</template>

<script setup lang="ts">
</script>

+++ backend/resources/js/views/shop/HomeView.vue (修改后)
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-indigo-600">E-Commerce Platform</h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/shop" class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Shop</router-link>
            <router-link to="/cart" class="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Cart</router-link>
            <router-link to="/login" class="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium">Login</router-link>
            <router-link to="/register" class="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md text-sm font-medium">Register</router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600">
      <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome to Our E-Commerce Platform
          </h2>
          <p class="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            Discover amazing products, great prices, and exceptional service. Start shopping today!
          </p>
          <div class="mt-10 flex justify-center gap-4">
            <router-link to="/shop" class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:text-lg md:px-10">
              Start Shopping
            </router-link>
            <router-link to="/register" class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-800 hover:bg-indigo-900 md:text-lg md:px-10">
              Create Account
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Us?
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-600 text-white">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900">Wide Selection</h3>
              <p class="mt-2 text-base text-gray-500">Browse thousands of products across multiple categories.</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-600 text-white">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900">Best Prices</h3>
              <p class="mt-2 text-base text-gray-500">Competitive pricing with regular discounts and deals.</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-600 text-white">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900">Secure Shopping</h3>
              <p class="mt-2 text-base text-gray-500">Your data is protected with enterprise-grade security.</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-600 text-white">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900">Fast Delivery</h3>
              <p class="mt-2 text-base text-gray-500">Quick shipping options to get your products fast.</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-600 text-white">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900">24/7 Support</h3>
              <p class="mt-2 text-base text-gray-500">Our customer support team is always here to help.</p>
            </div>

            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-600 text-white">
                <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 class="mt-6 text-lg font-medium text-gray-900">Easy Returns</h3>
              <p class="mt-2 text-base text-gray-500">Hassle-free return policy for your peace of mind.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-indigo-700">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to start shopping?
        </h2>
        <p class="mt-4 text-lg leading-6 text-indigo-200">
          Join thousands of satisfied customers and experience the best online shopping platform.
        </p>
        <router-link to="/register" class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
          Sign up for free
        </router-link>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="mt-8 border-t border-gray-700 pt-8">
          <p class="text-base text-gray-400 text-center">
            &copy; 2024 E-Commerce Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// HomeView component
</script>