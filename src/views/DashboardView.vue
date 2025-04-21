<template>
  <v-app>
    <v-app-bar elevation="1" color="primary">
      <v-toolbar-title class="text-white">
        <v-icon left>mdi-lock</v-icon>
        Password Manager
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <!-- Add Password Dialog -->
      <v-dialog v-model="addDialog" width="500">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            prepend-icon="mdi-plus"
            class="ml-3"
          >
            Add Password
          </v-btn>
        </template>

        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Add New Password</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="addDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="mt-4">
            <v-form @submit.prevent="addNewPassword">
              <v-text-field
                v-model="newPassword.username"
                label="Account Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="newPassword.userEmail"
                label="Username/Email"
              ></v-text-field>

              <v-text-field
                v-model="newPassword.decryptedPassword"
                label="Password"
                :type="showNewPassword ? 'text' : 'password'"
                :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showNewPassword = !showNewPassword"
              ></v-text-field>

              <v-textarea
                v-model="newPassword.notes"
                label="Notes"
                rows="2"
              ></v-textarea>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addNewPassword">Save</v-btn>
            <v-btn @click="addDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn
        color="accent"
        prepend-icon="mdi-plus"
        @click="addDialog = true"
        class="ml-3"
      >
        Add Password
      </v-btn>
      <v-btn 
        @click="authStore.logout()" 
        color="error" 
        class="ml-3"
        prepend-icon="mdi-logout"
      >
        Logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <!-- Password Cards Grid -->
        <v-row>
          <v-col
            v-for="(item, index) in passwords"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card 
              @click="openPasswordDialog(item, index)"
              class="password-card"
              elevation="3"
              hover
            >
              <v-card-item>
                <v-card-title class="text-wrap">
                  <v-icon left>mdi-account</v-icon>
                  {{ item.username }}
                </v-card-title>
                <v-card-subtitle>
                  Last updated: {{ formatDate(item.updatedAt) }}
                </v-card-subtitle>
              </v-card-item>

              <v-card-actions>
                <v-btn
                  color="error"
                  variant="text"
                  @click.stop="deletePassword(index)"
                  prepend-icon="mdi-delete"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Password Detail Dialog -->
        <v-dialog v-model="passwordDialog" max-width="600">
          <v-card v-if="currentPassword">
            <v-toolbar color="primary" dark>
              <v-toolbar-title>
                <v-icon left>mdi-account-details</v-icon>
                {{ currentPassword.username }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="passwordDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text class="mt-4">
              <v-form ref="passwordForm">
                <v-text-field
                  v-model="currentPassword.username"
                  label="Account Name"
                  variant="outlined"
                  :rules="[v => !!v || 'Account name is required']"
                ></v-text-field>

                <v-text-field
                  v-model="currentPassword.userEmail"
                  label="Username/Email"
                  variant="outlined"
                  :append-inner-icon="'mdi-content-copy'"
                  @click:append-inner="copyToClipboard(currentPassword.userEmail)"
                ></v-text-field>

                <v-text-field
                  v-model="passwordFieldValue"
                  :label="passwordVisible ? 'Password' : 'Password (hidden)'"
                  :type="passwordVisible ? 'text' : 'password'"
                  variant="outlined"
                  :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="passwordVisible = !passwordVisible"
                  :readonly="!passwordVisible"
                >
                  <template v-slot:append>
                    <v-btn
                      icon
                      variant="text"
                      color="primary"
                      @click.stop="copyToClipboard(currentPassword.decryptPassword || '')"
                      :disabled="!passwordVisible"
                    >
                      <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>

                <v-textarea
                  v-model="currentPassword.notes"
                  label="Notes"
                  variant="outlined"
                  rows="2"
                ></v-textarea>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="savePassword"
                :loading="saving"
              >
                <v-icon left>mdi-content-save</v-icon>
                Save Changes
              </v-btn>
              <v-btn
                color="grey"
                @click="passwordDialog = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="primary" variant="text" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, computed, readonly } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePasswordManager } from '@/composables/usePasswordManager'

const authStore = useAuthStore()
const { passwords, addPassword: addPasswordToStore, decryptPassword, encryptPassword } = usePasswordManager()

const addDialog = ref(false)
const showNewPassword = ref(false)
const passwordDialog = ref(false)
const passwordVisible = ref(false)
const saving = ref(false)
const currentPassword = ref(null)
const currentPasswordIndex = ref(-1)
const passwordForm = ref(null)
const snackbar = ref(false);
const snackbarText = ref('');

const newPassword = ref({
  username: '',
  userEmail: '',
  decryptedPassword: '',
  notes: '',
  updatedAt: new Date().toISOString()
});

const addNewPassword = () => {
  if (!newPassword.value.username || !newPassword.value.decryptedPassword) return;
  
  passwords.value.push({
    ...newPassword.value,
    password: '••••••••' // This would be encrypted in real implementation
  });
  
  // Reset form
  newPassword.value = {
    username: '',
    userEmail: '',
    decryptedPassword: '',
    notes: '',
    updatedAt: new Date().toISOString()
  };
  
  addDialog.value = false;
  
  // Show success message
  snackbarText.value = 'Password added successfully!';
  snackbar.value = true;
};

// Computed property to handle password field securely
const passwordFieldValue = computed({
  get() {
    return passwordVisible.value ? 
      (currentPassword.value?.decryptedPassword || '') : 
      '••••••••'
  },
  set(newValue) {
    if (passwordVisible.value && currentPassword.value) {
      currentPassword.value.decryptedPassword = newValue
    }
  }
})

const openPasswordDialog = async (password, index) => {
  currentPassword.value = { ...password }
  currentPasswordIndex.value = index
  passwordVisible.value = false
  
  // Decrypt password when dialog opens
  if (!currentPassword.value.decryptedPassword) {
    currentPassword.value.decryptedPassword = await decryptPassword(password.username)
  }
  
  passwordDialog.value = true
}

const savePassword = async () => {
  const { valid } = await passwordForm.value.validate()
  if (!valid) return

  saving.value = true
  
  try {
    // Update the password in the list
    passwords.value[currentPasswordIndex.value] = {
      ...currentPassword.value,
      updatedAt: new Date().toISOString()
    }
    
    passwordDialog.value = false
  } finally {
    saving.value = false
  }
}

const deletePassword = (index) => {
  passwords.value.splice(index, 1)
  if (currentPasswordIndex.value === index) {
    passwordDialog.value = false
  }
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  snackbarText.value = text.includes('@') ? 'Username copied!' : 'Password copied!'
  snackbar.value = true
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<style scoped>
.password-card {
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 150px;
  display: flex;
  flex-direction: column;
}

.password-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}
</style>