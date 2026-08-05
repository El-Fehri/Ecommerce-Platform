<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="mx-auto h-16 w-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-xl">
          <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18v-2m3 0c0-.365.026-.724.076-1.076M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12H7.5A2.25 2.25 0 005.25 14.25v1.5A2.25 2.25 0 007.5 18h9a2.25 2.25 0 002.25-2.25v-1.5A2.25 2.25 0 0016.5 12H15m-6 0V9a3 3 0 116 0v3" />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Two-Factor Authentication
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your authentication code
        </p>
      </div>

      <!-- 2FA Form -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <form @submit.prevent="handleVerify" class="space-y-6">
          <!-- OTP Input -->
          <div>
            <label for="otp" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Authentication Code
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <input
                id="otp"
                v-model="form.otp"
                name="otp"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="6"
                required
                class="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 placeholder-gray-400 tracking-widest text-center text-lg font-mono"
                placeholder="000000"
              />
            </div>
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            <span v-if="!loading" class="flex items-center">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Verify
            </span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          </button>

          <!-- Error Message -->
          <div v-if="error" class="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Help Link -->
      <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Can't access your code?
        <router-link to="/login" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold underline">
          Go back to login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  otp: ''
})

const loading = ref(false)
const error = ref('')

const handleVerify = async () => {
  loading.value = true
  error.value = ''
  
  // Validate OTP format
  if (!/^\d{6}$/.test(form.value.otp)) {
    error.value = 'Please enter a valid 6-digit code.'
    loading.value = false
    return
  }
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // TODO: Implement actual 2FA verification logic
    console.log('2FA verification:', form.value)
    
    // Redirect to dashboard after successful verification
    router.push('/account')
  } catch (err) {
    error.value = 'Invalid code. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
