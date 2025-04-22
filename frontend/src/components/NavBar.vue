<template>
  <v-app-bar color="primary" dark>
    <v-app-bar-title>Password Manager</v-app-bar-title>
    
    <v-spacer></v-spacer>
    
    <v-btn v-if="authStore.user" @click="authStore.logout" color="error">
      <v-icon left>mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>