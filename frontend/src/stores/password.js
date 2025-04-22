import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const usePasswordStore = defineStore('password', () => {
  // State
  const passwords = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPassword = ref(null)

  // Actions
  const fetchPasswords = async () => {
    loading.value = true
    try {
      const response = await api.getPasswords()
      passwords.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch passwords'
    } finally {
      loading.value = false
    }
  }

  const addPassword = async (passwordData) => {
    try {
      const response = await api.addPassword(passwordData)
      passwords.value.push(response.data)
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to add password'
      return false
    }
  }

  const decryptPassword = async (id) => {
    try {
      const response = await api.decryptPassword(id)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to decrypt password'
      throw err
    }
  }

  return {
    // State
    passwords, 
    loading,
    error,
    currentPassword,
    
    // Actions
    fetchPasswords,
    addPassword,
    decryptPassword
  }
})