<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="username"
      label="Username"
      :rules="[v => !!v || 'Username is required']"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Master Password"
      :type="showPassword ? 'text' : 'password'"
      :rules="[v => !!v || 'Password is required']"
      required
      :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      @click:append-inner="showPassword = !showPassword"
    ></v-text-field>

    <v-alert
      v-if="error"
      type="error"
      class="mt-4"
    >
      {{ error }}
    </v-alert>

    <v-btn
      type="submit"
      color="primary"
      block
      :loading="loading"
      class="mt-4"
    >
      Login
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref(null)

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  try {
    await authStore.login({
      username: username.value,
      password: password.value
    })
    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>