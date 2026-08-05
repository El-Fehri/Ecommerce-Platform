<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="mx-auto h-16 w-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-xl">
          <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Verify Your Email
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          We've sent a verification link to your email
        </p>
      </div>

      <!-- Verification Card -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <div class="text-center">
          <!-- Email Icon -->
          <div class="mx-auto h-20 w-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
            <svg class="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Check your inbox
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
            We've sent a verification email to 
            <span class="font-medium text-primary-600 dark:text-primary-400">{{ userEmail }}</span>
          </p>

          <!-- Actions -->
          <div class="space-y-3">
            <button
              @click="handleResend"
              :disabled="loading || resendCooldown > 0"
              class="w-full py-3 px-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              <span v-if="!loading && resendCooldown === 0" class="flex items-center">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Resend verification email
              </span>
              <span v-else-if="resendCooldown > 0" class="flex items-center">
                <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Resend in {{ resendCooldown }}s
              </span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            </button>

            <button
              @click="handleVerifyNow"
              class="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              I've verified my email
            </button>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-green-700 dark:text-green-300">{{ success }}</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
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
        </div>
      </div>

      <!-- Back to Login -->
      <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        Want to use a different email?
        <router-link to="/login" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-semibold underline">
          Sign in with another account
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userEmail = ref('user@example.com')
const loading = ref(false)
const error = ref('')
const success = ref('')
const resendCooldown = ref(0)

// Simulate getting user email from auth state
onMounted(() => {
  // TODO: Get actual user email from auth store
  const storedEmail = localStorage.getItem('pending_verification_email')
  if (storedEmail) {
    userEmail.value = storedEmail
  }
})

const handleResend = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // TODO: Implement actual resend verification email logic
    console.log('Resending verification email to:', userEmail.value)
    
    success.value = 'Verification email sent! Please check your inbox.'
    
    // Start cooldown timer
    resendCooldown.value = 30
    const timer = setInterval(() => {
      resendCooldown.value--
      if (resendCooldown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (err) {
    error.value = 'Failed to send verification email. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleVerifyNow = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Simulate API call to verify email status
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // TODO: Implement actual email verification check
    console.log('Checking verification status for:', userEmail.value)
    
    // Simulate successful verification
    success.value = 'Email verified successfully! Redirecting...'
    
    setTimeout(() => {
      router.push('/account')
    }, 1500)
  } catch (err) {
    error.value = 'Email not yet verified. Please check your inbox and spam folder.'
  } finally {
    loading.value = false
  }
}
</script>
