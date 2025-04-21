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