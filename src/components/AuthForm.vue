<script setup>
import { ref } from 'vue'
import { LockClosedIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const masterPassword = ref('')
const error = ref('')

const handleSubmit = async () => {
    try {
        await authStore.verifyMasterPassword(masterPassword.value)
    } catch (err) {
        error.value = err.message
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
            <label for="password" class="block text-sm font medium text-gray-700">
                Master Password
            </label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input
                    id="password"
                    v-model="masterPassword"
                    type="password"
                    required
                    class="block w-full pr-10 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <LockClosedIcon class="h-4 w-4 text-gray-400" />
                </div>
            </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <div>
            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Unlock
            </button>
        </div>
    </form>
</template>