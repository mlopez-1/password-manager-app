<script setup>
import NavBar from '@/components/NavBar.vue'
import PasswordForm from '@/components/PasswordForm.vue'
import PasswordList from '@/components/PasswordList.vue'
</script>

<template>
  <div class="min-h-full">
    <NavBar />
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Add New Password</h2>
            <PasswordForm />
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Your Passwords</h2>
            <PasswordList />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>