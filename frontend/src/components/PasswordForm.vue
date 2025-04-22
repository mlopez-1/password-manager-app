<script setup>
import { ref } from 'vue'
import { usePasswordManager } from '@/composables/usePasswordManager'

const { addPassword } = usePasswordManager()

const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  try {
    await addPassword(username.value, password.value)
    success.value = 'Password added successfully!'
    username.value = ''
    password.value = ''
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username/Service</label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
        </div>

        <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
                id="password"
                v-model="password"
                type="password"
                required
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <div v-if="success" class="text-green-500 text-sm">{{ success }}</div>

        <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
        Save Password
        </button>
    </form>
</template>
