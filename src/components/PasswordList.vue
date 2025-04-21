<script setup>
import { ref, onMounted } from 'vue'
import { ClipboardIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { usePasswordManager } from '@/composables/usePasswordManager'

const { passwords, getPasswords, decryptPassword } = usePasswordManager()
const loading = ref(false)
const error = ref('')
const revealedPasswords = ref({})

onMounted(async () => {
  loading.value = true
  try {
    await getPasswords()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

const togglePasswordVisibility = async (username) => {
  if (!revealedPasswords.value[username]) {
    try {
      const decrypted = await decryptPassword(username)
      revealedPasswords.value[username] = decrypted
    } catch (err) {
      error.value = err.message
    }
  } else {
    revealedPasswords.value[username] = null
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
}
</script>

<template>
    <div class="space-y-4">
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <ul v-if="passwords.length > 0" class="divide-y divide-gray-200">
            <li v-for="(password, index) in passwords" :key="index" class="py-4">
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium text-gray-900">{{ password.username }}</div>
                <div class="flex items-center space-x-2">
                  <span v-if="revealedPasswords[password.username]" class="text-sm text-gray-500">
                    {{ revealedPasswords[password.username] }}
                  </span>
                  <button
                    @click="togglePasswordVisibility(password.username)"
                    class="text-indigo-600 hover: text-indigo-900"
                  >
                    <EyeIcon v-if="!revealedPasswords[password.username]" class="h-5 w-5" />
                    <EyeSlashIcon v-else class="h-5 w-5" />
                  </button>
                  <button
                    @click="copyToClipboard(revealedPasswords[password.username] || password.password)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    <ClipboardIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
        </ul>
        <div v-else class="text-center text-gray-500">No passwords saved yet</div>
    </div>
</template>