import { ref } from 'vue'
import axios from 'axios'

export const usePasswordManager = () => {
    const passwords = ref([])
    const error = ref(null)
  
    const getPasswords = async () => {
      try {
        const response = await axios.get('/api/passwords')
        passwords.value = response.data
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to fetch passwords'
        throw err
      }
    }
  
    const addPassword = async (username, password) => {
      try {
        await axios.post('/api/passwords', { username, password })
        await getPasswords() // Refresh the list
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to add password'
        throw err
      }
    }
  
    const decryptPassword = async (username) => {
      try {
        const response = await axios.get(`/api/passwords/${username}/decrypt`)
        return response.data.password
      } catch (err) {
        error.value = err.response?.data?.message || 'Failed to decrypt password'
        throw err
      }
    }
  
    return {
      passwords,
      error,
      getPasswords,
      addPassword,
      decryptPassword
    }
  }