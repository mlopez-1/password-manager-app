<template>
  <v-app>
    <!-- Top Bar -->
    <v-app-bar elevation="0" color="primary">
      <v-toolbar-title class="flex text-center">
        Password Manager
      </v-toolbar-title>
      
      <!-- Add Password Dialog -->
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ props }">
          <v-btn
            elevation="3"
            v-bind="props"
            @click="resetForm()"
          >
            <v-icon left>mdi-plus-circle</v-icon>
            ADD PASSWORD
          </v-btn>
        </template>

        <v-form @submit.prevent="addPassword" validate-on="submit">
          <v-card>
            <v-toolbar color="primary">
              <v-col class="d-flex">
                <v-icon left>mdi-plus-circle</v-icon>
                <v-toolbar-title>
                  <strong> Add Password </strong>
                </v-toolbar-title>
              </v-col>
            </v-toolbar>

            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Username/Service"
                    v-model="username"
                    variant="outlined"
                    :rules="usernameRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    v-model="password"
                    variant="outlined"
                    :rules="passwordRules"
                    required
                    :type="showPassword ? 'text' : 'password'"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="addPassword"
                type="submit"
                style="margin-right: 8px; width: 100px"
              >
                <v-icon left>mdi-plus-circle</v-icon>
                Add
              </v-btn>
              <v-btn color="red" @click="dialog = false" style="width: 100px">
                <v-icon left>mdi-cancel</v-icon>
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <v-btn @click="authStore.logout()" color="red" style="margin-left: 10px">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <v-card>
          <v-table>
            <thead>
              <tr>
                <th class="text-center">Username/Service</th>
                <th class="text-center">Password</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in passwords" :key="index">
                <td class="text-center">{{ item.username }}</td>
                <td class="text-center">
                  {{ revealedPasswords[item.username] || '••••••••' }}
                </td>
                <td class="text-center">
                  <v-btn
                    color="primary"
                    size="small"
                    @click="togglePasswordVisibility(item.username)"
                    style="margin-right: 5px"
                  >
                    <v-icon left>{{ revealedPasswords[item.username] ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>
                    {{ revealedPasswords[item.username] ? 'Hide' : 'Show' }}
                  </v-btn>
                  <v-btn
                    color="red"
                    size="small"
                    @click="deletePassword(index)"
                  >
                    <v-icon left>mdi-delete</v-icon>
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePasswordManager } from '@/composables/usePasswordManager'

const authStore = useAuthStore()
const { passwords, addPassword: addPasswordToStore, decryptPassword } = usePasswordManager()

const dialog = ref(false)
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const revealedPasswords = ref({})

const usernameRules = [
  v => !!v || 'Username/Service is required',
  v => !passwords.value.some(item => item.username === v) || 'This username/service already exists'
]

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 8 || 'Password must be at least 8 characters'
]

const resetForm = () => {
  username.value = ''
  password.value = ''
  showPassword.value = false
}

const addPassword = () => {
  if (!username.value || !password.value) return
  
  addPasswordToStore(username.value, password.value)
  dialog.value = false
  resetForm()
}

const togglePasswordVisibility = async (username) => {
  if (!revealedPasswords.value[username]) {
    try {
      const decrypted = await decryptPassword(username)
      revealedPasswords.value[username] = decrypted
    } catch (err) {
      console.error('Error decrypting password:', err)
    }
  } else {
    revealedPasswords.value[username] = null
  }
}

const deletePassword = (index) => {
  passwords.value.splice(index, 1)
}
</script>