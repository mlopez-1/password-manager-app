<template>
  <v-form @submit.prevent="handleSubmit">
    <v-card>
      <v-toolbar :color="isEditMode ? 'primary' : 'secondary'" dark>
        <v-toolbar-title>
          {{ isEditMode ? 'Edit Password' : 'Add New Password' }}
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-4">
        <v-text-field
          v-model="form.accountName"
          label="Account Name"
          :rules="[v => !!v || 'Account name is required']"
          required
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="form.username"
          label="Username/Email"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :label="showPassword ? 'Password' : 'Password (hidden)'"
          :type="showPassword ? 'text' : 'password'"
          :rules="[v => !!v || 'Password is required']"
          required
          variant="outlined"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        ></v-text-field>

        <v-textarea
          v-model="form.notes"
          label="Notes"
          rows="2"
          variant="outlined"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          variant="text"
          @click="$emit('cancel')"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          type="submit"
          :loading="passwordStore.loading"
        >
          {{ isEditMode ? 'Update' : 'Save' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { usePasswordStore } from '@/stores/password'

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const passwordStore = usePasswordStore()
const showPassword = ref(false)
const isEditMode = ref(false)

const form = ref({
  accountName: '',
  username: '',
  password: '',
  notes: ''
})

// Initialize form if editing
watch(() => props.initialData, (data) => {
  if (data) {
    isEditMode.value = true
    form.value = {
      accountName: data.accountName,
      username: data.username,
      password: '', // Password is empty for security
      notes: data.notes || ''
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  const success = await passwordStore.addPassword({
    accountName: form.value.accountName,
    username: form.value.username,
    password: form.value.password,
    notes: form.value.notes
  })

  if (success) {
    emit('submit')
    resetForm()
  }
}

const resetForm = () => {
  form.value = {
    accountName: '',
    username: '',
    password: '',
    notes: ''
  }
  showPassword.value = false
  isEditMode.value = false
}
</script>