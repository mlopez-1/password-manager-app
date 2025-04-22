<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  
  const authStore = useAuthStore()
  const masterPassword = ref('')
  const error = ref('')
  
  const handleSubmit = async () => {
    try {
      await authStore.verifyMasterPassword(masterPassword.value)
    } catch (err) {
      error.value = err.message || 'Invalid master password'
    }
  }
  </script>

<template>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="masterPassword"
        label="Master Password"
        type="password"
        required
      ></v-text-field>
  
      <v-alert v-if="error" type="error">{{ error }}</v-alert>
  
      <v-btn 
        type="submit" 
        color="primary" 
        block
        :loading="authStore.loading"
      >
        Unlock
      </v-btn>
    </v-form>
  </template>