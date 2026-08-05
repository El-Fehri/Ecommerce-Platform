<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="flex items-center">
              <div class="h-10 w-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span class="ml-3 text-xl font-bold text-gray-900 dark:text-white">E-Shop</span>
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Search Bar -->
            <div class="hidden md:flex relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products..."
                class="input pl-10 pr-4 py-2 w-64"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Cart Button -->
            <router-link to="/cart" class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 h-5 w-5 bg-accent-600 text-white text-xs rounded-full flex items-center justify-center">
                {{ cartCount }}
              </span>
            </router-link>
            
            <!-- User Menu -->
            <router-link to="/account" class="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Page Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shop All Products</h1>
          <p class="text-gray-600 dark:text-gray-400">Discover our curated collection of premium products</p>
        </div>

        <!-- Filters and Sort -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-4 mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <!-- Category Filter -->
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</label>
              <select v-model="selectedCategory" class="input py-2">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports & Outdoors</option>
              </select>
            </div>

            <!-- Sort Options -->
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</label>
              <select v-model="sortBy" class="input py-2">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="card group hover:shadow-xl transition-all duration-300"
          >
            <!-- Product Image -->
            <div class="relative aspect-square overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <!-- Badges -->
              <div v-if="product.badge" class="absolute top-2 left-2">
                <span :class="`px-2 py-1 text-xs font-semibold rounded-md ${product.badge === 'Sale' ? 'bg-accent-600 text-white' : 'bg-primary-600 text-white'}`">
                  {{ product.badge }}
                </span>
              </div>
              <!-- Wishlist Button -->
              <button class="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-accent-50 dark:hover:bg-gray-700">
                <svg class="h-5 w-5 text-gray-400 hover:text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ product.category }}</p>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ product.name }}</h3>
              
              <!-- Rating -->
              <div class="flex items-center mb-2">
                <div class="flex items-center">
                  <svg v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">({{ product.reviews }})</span>
              </div>

              <!-- Price and Add to Cart -->
              <div class="flex items-center justify-between mt-4">
                <div>
                  <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
                  <p class="text-lg font-bold text-primary-600 dark:text-primary-400">${{ product.price.toFixed(2) }}</p>
                </div>
                <button
                  @click="addToCart(product)"
                  class="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h2>
          <p class="text-gray-600 dark:text-gray-400">Try adjusting your filters or search query</p>
        </div>

        <!-- Pagination -->
        <div v-if="products.length > 0" class="mt-12 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button class="btn-outline px-4 py-2" :disabled="currentPage === 1">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              :class="`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page ? 'bg-primary-600 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`"
            >
              {{ page }}
            </button>
            <button class="btn-outline px-4 py-2" :disabled="currentPage === totalPages">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-gray-950 mt-16">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-white font-semibold mb-4">About Us</h3>
            <p class="text-gray-400 text-sm">Your trusted destination for quality products at great prices.</p>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><router-link to="/shop" class="hover:text-white">Shop</router-link></li>
              <li><router-link to="/about" class="hover:text-white">About</router-link></li>
              <li><router-link to="/contact" class="hover:text-white">Contact</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-4">Customer Service</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white">FAQ</a></li>
              <li><a href="#" class="hover:text-white">Shipping</a></li>
              <li><a href="#" class="hover:text-white">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-4">Newsletter</h3>
            <p class="text-gray-400 text-sm mb-4">Subscribe for exclusive deals</p>
            <div class="flex">
              <input type="email" placeholder="Your email" class="input rounded-r-none" />
              <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-lg">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          &copy; 2024 E-Shop. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('featured')
const currentPage = ref(1)
const itemsPerPage = 8

// Mock products data
const products = ref([
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    originalPrice: 249.99,
    image: '/images/headphones.jpg',
    rating: 5,
    reviews: 128,
    badge: 'Sale'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    category: 'Electronics',
    price: 299.99,
    originalPrice: null,
    image: '/images/watch.jpg',
    rating: 4,
    reviews: 89,
    badge: 'New'
  },
  {
    id: 3,
    name: 'Organic Cotton T-Shirt',
    category: 'Clothing',
    price: 39.99,
    originalPrice: null,
    image: '/images/tshirt.jpg',
    rating: 4,
    reviews: 256,
    badge: null
  },
  {
    id: 4,
    name: 'Minimalist Desk Lamp',
    category: 'Home',
    price: 79.99,
    originalPrice: 99.99,
    image: '/images/lamp.jpg',
    rating: 5,
    reviews: 64,
    badge: 'Sale'
  },
  {
    id: 5,
    name: 'Yoga Mat Premium',
    category: 'Sports',
    price: 49.99,
    originalPrice: null,
    image: '/images/yogamat.jpg',
    rating: 4,
    reviews: 312,
    badge: null
  },
  {
    id: 6,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 89.99,
    originalPrice: null,
    image: '/images/speaker.jpg',
    rating: 4,
    reviews: 178,
    badge: 'New'
  },
  {
    id: 7,
    name: 'Running Shoes Elite',
    category: 'Sports',
    price: 129.99,
    originalPrice: 159.99,
    image: '/images/shoes.jpg',
    rating: 5,
    reviews: 445,
    badge: 'Sale'
  },
  {
    id: 8,
    name: 'Ceramic Plant Pot Set',
    category: 'Home',
    price: 34.99,
    originalPrice: null,
    image: '/images/pot.jpg',
    rating: 4,
    reviews: 92,
    badge: null
  }
])

const cartCount = ref(2)

const filteredProducts = computed(() => {
  let result = [...products.value]
  
  // Filter by search query
  if (searchQuery.value) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(p => 
      p.category.toLowerCase() === selectedCategory.value.toLowerCase()
    )
  }
  
  // Sort products
  switch (sortBy.value) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      result.sort((a, b) => b.id - a.id)
      break
  }
  
  return result
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const addToCart = (product: any) => {
  console.log('Added to cart:', product)
  cartCount.value++
  // TODO: Implement actual cart logic
}
</script>
