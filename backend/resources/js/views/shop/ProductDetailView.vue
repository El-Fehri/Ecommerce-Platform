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
            <router-link to="/cart" class="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span v-if="cartCount > 0" class="absolute -top-1 -right-1 h-5 w-5 bg-accent-600 text-white text-xs rounded-full flex items-center justify-center">
                {{ cartCount }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="flex mb-8" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-2">
            <li><router-link to="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Home</router-link></li>
            <li class="text-gray-400">/</li>
            <li><router-link to="/shop" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Shop</router-link></li>
            <li class="text-gray-400">/</li>
            <li class="text-gray-900 dark:text-white font-medium">{{ product.name }}</li>
          </ol>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div>
            <div class="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
            </div>
            <!-- Thumbnail Images -->
            <div class="grid grid-cols-4 gap-4 mt-4">
              <div v-for="i in 4" :key="i" class="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer border-2 border-transparent hover:border-primary-600 transition-colors">
                <img :src="product.image" :alt="`${product.name} view ${i}`" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div>
            <div class="mb-2">
              <span class="text-sm text-primary-600 dark:text-primary-400 font-semibold">{{ product.category }}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ product.name }}</h1>
            
            <!-- Rating -->
            <div class="flex items-center mb-6">
              <div class="flex items-center">
                <svg v-for="i in 5" :key="i" class="h-5 w-5" :class="i <= product.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-3 text-gray-600 dark:text-gray-400">{{ product.reviews }} reviews</span>
            </div>

            <!-- Price -->
            <div class="mb-6">
              <div class="flex items-baseline">
                <p class="text-3xl font-bold text-primary-600 dark:text-primary-400">${{ product.price.toFixed(2) }}</p>
                <span v-if="product.originalPrice" class="ml-3 text-xl text-gray-400 line-through">${{ product.originalPrice.toFixed(2) }}</span>
                <span v-if="product.badge" :class="`ml-3 px-3 py-1 text-sm font-semibold rounded-full ${product.badge === 'Sale' ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400' : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'}`">
                  {{ product.badge }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{{ product.description }}</p>

            <!-- Variant Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
              <div class="flex space-x-3">
                <button
                  v-for="color in colors"
                  :key="color.name"
                  @click="selectedColor = color.name"
                  :class="`w-10 h-10 rounded-full border-2 focus:outline-none transition-all ${selectedColor === color.name ? 'border-primary-600 ring-2 ring-primary-600 ring-offset-2' : 'border-gray-300'}`"
                  :style="{ backgroundColor: color.value }"
                ></button>
              </div>
            </div>

            <!-- Quantity -->
            <div class="mb-8">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
              <div class="flex items-center space-x-4">
                <button
                  @click="quantity = Math.max(1, quantity - 1)"
                  class="h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="text-lg font-medium text-gray-900 dark:text-white w-12 text-center">{{ quantity }}</span>
                <button
                  @click="quantity++"
                  class="h-10 w-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Add to Cart -->
            <div class="flex space-x-4 mb-8">
              <button
                @click="addToCart"
                class="flex-1 btn-primary py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Add to Cart
              </button>
              <button class="p-4 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <svg class="h-6 w-6 text-gray-400 hover:text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <!-- Features -->
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div class="space-y-3">
                <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg class="h-5 w-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping on orders over $100
                </div>
                <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg class="h-5 w-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  30-day return policy
                </div>
                <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <svg class="h-5 w-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  2-year warranty included
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Products</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="item in relatedProducts" :key="item.id" class="card group">
              <div class="aspect-square rounded-t-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ item.name }}</h3>
                <p class="text-primary-600 dark:text-primary-400 font-bold">${{ item.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cartCount = ref(2)
const quantity = ref(1)
const selectedColor = ref('Black')

const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Blue', value: '#0000FF' }
]

const product = ref({
  id: 1,
  name: 'Premium Wireless Headphones',
  category: 'Electronics',
  price: 199.99,
  originalPrice: 249.99,
  image: '/images/headphones.jpg',
  rating: 5,
  reviews: 128,
  badge: 'Sale',
  description: 'Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day listening.'
})

const relatedProducts = ref([
  { id: 2, name: 'Smart Watch Pro', price: 299.99, image: '/images/watch.jpg' },
  { id: 6, name: 'Bluetooth Speaker', price: 89.99, image: '/images/speaker.jpg' },
  { id: 3, name: 'Organic Cotton T-Shirt', price: 39.99, image: '/images/tshirt.jpg' },
  { id: 5, name: 'Yoga Mat Premium', price: 49.99, image: '/images/yogamat.jpg' }
])

const addToCart = () => {
  console.log('Added to cart:', { product: product.value, quantity: quantity.value, color: selectedColor.value })
  cartCount.value += quantity.value
}
</script>
