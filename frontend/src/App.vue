<template>
  <v-app>
    <NavBar v-if="authStore.user" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import NavBar from '@/components/NavBar.vue'

const authStore = useAuthStore()
</script>

<style>
.v-application {
  background-color: #f8f9fa !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #6B8E23;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #556B2F;
}
</style>
