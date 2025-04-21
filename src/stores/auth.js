import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const error = ref(null)
    const loading = ref(false)
  
    const verifyMasterPassword = async (password) => {
      loading.value = true
      try {
        const response = await axios.post('/api/auth/verify', { password })
        isAuthenticated.value = true
        router.push('/dashboard')
      } catch (err) {
        error.value = err.response?.data?.message || 'Invalid master password'
        throw err
      } finally {
        loading.value = false
      }
    }
  
    const logout = () => {
      isAuthenticated.value = false
      router.push('/')
    }
  
    return {
      isAuthenticated,
      error,
      loading,
      verifyMasterPassword,
      logout
    }
  })