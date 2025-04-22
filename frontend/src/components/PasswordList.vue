<template>
  <div class="password-list">
    <!-- Loading State -->
    <div v-if="passwordStore.loading" class="text-center py-8">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p class="mt-4">Loading passwords...</p>
    </div>

    <!-- Error State -->
    <v-alert v-if="passwordStore.error" type="error" class="mb-4">
      {{ passwordStore.error }}
    </v-alert>

    <!-- Empty State -->
    <div v-if="!passwordStore.loading && passwordStore.passwords.length === 0" class="text-center py-8">
      <v-icon size="64" color="grey-lighten-1">mdi-folder-lock-open-outline</v-icon>
      <h3 class="text-h5 mt-4">No passwords saved yet</h3>
      <p class="text-body-1">Add your first password to get started</p>
    </div>

    <!-- Password Cards -->
    <v-row v-else>
      <v-col
        v-for="password in passwordStore.passwords"
        :key="password.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="password-card" elevation="3">
          <v-card-item>
            <v-card-title>
              <v-icon left>mdi-account</v-icon>
              {{ password.accountName }}
            </v-card-title>
            <v-card-subtitle>
              {{ password.username }}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <v-text-field
              :value="revealedPasswords[password.id] || '••••••••'"
              :type="revealedPasswords[password.id] ? 'text' : 'password'"
              readonly
              density="compact"
              variant="outlined"
            >
              <template v-slot:append>
                <v-btn
                  icon
                  size="small"
                  @click.stop="togglePasswordVisibility(password)"
                >
                  <v-icon>
                    {{ revealedPasswords[password.id] ? 'mdi-eye-off' : 'mdi-eye' }}
                  </v-icon>
                </v-btn>
                <v-btn
                  v-if="revealedPasswords[password.id]"
                  icon
                  size="small"
                  @click.stop="copyToClipboard(revealedPasswords[password.id])"
                >
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              prepend-icon="mdi-pencil"
              @click="openEditDialog(password)"
            >
              Edit
            </v-btn>
            <v-btn
              color="error"
              variant="text"
              prepend-icon="mdi-delete"
              @click="deletePassword(password.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePasswordStore } from '@/stores/password'

const passwordStore = usePasswordStore()
const revealedPasswords = ref({})

onMounted(async () => {
  await passwordStore.fetchPasswords()
})

const togglePasswordVisibility = async (password) => {
  if (!revealedPasswords.value[password.id]) {
    try {
      const decrypted = await passwordStore.decryptPassword(password.id)
      revealedPasswords.value[password.id] = decrypted
    } catch (error) {
      console.error('Failed to decrypt:', error)
    }
  } else {
    revealedPasswords.value[password.id] = null
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  // You can add a snackbar notification here
}

const openEditDialog = (password) => {
  // Implement edit functionality
  console.log('Edit password:', password)
}

const deletePassword = async (id) => {
  // Implement delete functionality
  console.log('Delete password:', id)
}
</script>

<style scoped>
.password-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.password-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>