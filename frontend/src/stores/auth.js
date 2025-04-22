import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

// export const useAuthStore = defineStore('auth', () => {
//     const isAuthenticated = ref(false)
//     const error = ref(null)
//     const loading = ref(false)
  
//     const verifyMasterPassword = async (password) => {
//       loading.value = true
//       try {
//         const response = await axios.post('/api/auth/verify', { password })
//         isAuthenticated.value = true
//         router.push('/dashboard')
//       } catch (err) {
//         error.value = err.response?.data?.message || 'Invalid master password'
//         throw err
//       } finally {
//         loading.value = false
//       }
//     }
  
//     const logout = () => {
//       isAuthenticated.value = false
//       router.push('/')
//     }
  
//     return {
//       isAuthenticated,
//       error,
//       loading,
//       verifyMasterPassword,
//       logout
//     }
//   })

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    error: null,
    loading: false
  }),
  actions: {
    async verifyMasterPassword(password) {
      this.loading = true
      this.error = null
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        if (password === 'demo') { // Temporary hardcoded for testing
          this.isAuthenticated = true
          router.push('/dashboard')
        } else {
          throw new Error('Invalid master password')
        }
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.isAuthenticated = false
      router.push('/')
    }
  },
  persist: true // Add this if using pinia-plugin-persistedstate
})