<script setup>
import AuthForm from '@/components/AuthForm.vue'
</script>

<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Password Manager
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your master password to continue
        </p>
      </div>
      <AuthForm />
    </div>
  </div>
</template>