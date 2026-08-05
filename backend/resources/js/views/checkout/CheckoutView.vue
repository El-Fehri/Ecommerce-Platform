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
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Checkout</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Checkout Form -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Shipping Information -->
            <div class="card p-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Shipping Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="label">First name</label>
                  <input type="text" v-model="form.firstName" class="input" placeholder="John" />
                </div>
                <div>
                  <label class="label">Last name</label>
                  <input type="text" v-model="form.lastName" class="input" placeholder="Doe" />
                </div>
                <div class="md:col-span-2">
                  <label class="label">Email</label>
                  <input type="email" v-model="form.email" class="input" placeholder="john@example.com" />
                </div>
                <div class="md:col-span-2">
                  <label class="label">Address</label>
                  <input type="text" v-model="form.address" class="input" placeholder="123 Main St" />
                </div>
                <div>
                  <label class="label">City</label>
                  <input type="text" v-model="form.city" class="input" placeholder="New York" />
                </div>
                <div>
                  <label class="label">Postal code</label>
                  <input type="text" v-model="form.postalCode" class="input" placeholder="10001" />
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="card p-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Method</h2>
              <div class="space-y-4">
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <input type="radio" v-model="paymentMethod" value="card" class="checkbox" />
                  <div class="ml-3 flex-1">
                    <p class="font-medium text-gray-900 dark:text-white">Credit Card</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Pay securely with credit card</p>
                  </div>
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </label>
                <label class="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <input type="radio" v-model="paymentMethod" value="paypal" class="checkbox" />
                  <div class="ml-3 flex-1">
                    <p class="font-medium text-gray-900 dark:text-white">PayPal</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Pay with your PayPal account</p>
                  </div>
                  <svg class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 4.47a.77.77 0 0 1 .76-.63h7.194c1.024 0 1.925.183 2.683.548.758.365 1.347.885 1.767 1.56.42.675.63 1.465.63 2.37 0 1.155-.315 2.175-.945 3.06-.63.885-1.5 1.575-2.61 2.07-1.11.495-2.385.743-3.825.743h-1.92a.641.641 0 0 0-.633.548l-.758 4.813a.641.641 0 0 1-.633.54z"/>
                  </svg>
                </label>
              </div>

              <!-- Card Details -->
              <div v-if="paymentMethod === 'card'" class="mt-6 space-y-4">
                <div>
                  <label class="label">Card number</label>
                  <input type="text" v-model="form.cardNumber" class="input" placeholder="1234 5678 9012 3456" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="label">Expiry date</label>
                    <input type="text" v-model="form.expiryDate" class="input" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label class="label">CVV</label>
                    <input type="text" v-model="form.cvv" class="input" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="card p-6 sticky top-24">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <!-- Cart Items -->
              <div class="space-y-4 mb-6">
                <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-3">
                  <div class="h-16 w-16 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img :src="item.image" :alt="item.name" class="h-full w-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ item.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Qty: {{ item.quantity }}</p>
                  </div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">${{ (item.price * item.quantity).toFixed(2) }}</p>
                </div>
              </div>

              <!-- Totals -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <div class="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{{ shipping === 0 ? 'Free' : '$' + shipping.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax</span>
                  <span>${{ tax.toFixed(2) }}</span>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div class="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${{ total.toFixed(2) }}</span>
                  </div>
                </div>
              </div>

              <!-- Place Order Button -->
              <button
                @click="placeOrder"
                :disabled="processing"
                class="btn-primary w-full mt-6 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span v-if="!processing">Place Order</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              </button>

              <!-- Security Badge -->
              <div class="mt-4 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const processing = ref(false)
const paymentMethod = ref('card')
const cartCount = ref(2)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
})

const cartItems = ref([
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    quantity: 1,
    image: '/images/headphones.jpg'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    quantity: 1,
    image: '/images/watch.jpg'
  }
])

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 9.99
})

const tax = computed(() => {
  return subtotal.value * 0.08
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

const placeOrder = async () => {
  processing.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Order placed:', { form: form.value, items: cartItems.value })
    router.push('/account/orders')
  } catch (error) {
    console.error('Order failed:', error)
  } finally {
    processing.value = false
  }
}
</script>
