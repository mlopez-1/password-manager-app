<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-indigo-600">Password Manager</span>
          </div>
        </div>
        <div class="flex items-center">
          <button
            @click="authStore.logout()"
            class="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-900"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>