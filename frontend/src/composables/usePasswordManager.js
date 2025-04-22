import { ref } from 'vue'

export const usePasswordManager = () => {
  const passwords = ref([
    { 
      username: 'Personal Email', 
      userEmail: 'example@gmail.com', 
      password: '••••••••',
      notes: 'Main personal email account',
      updatedAt: new Date().toISOString()
    },
    { 
      username: 'Bank Account', 
      userEmail: 'john.doe@bank.com', 
      password: '••••••••',
      notes: 'Primary checking account',
      updatedAt: new Date().toISOString()
    },
    { 
      username: 'Netflix', 
      userEmail: 'john@streaming.com', 
      password: '••••••••',
      notes: 'Family plan',
      updatedAt: new Date().toISOString()
    }
  ])
  
  const addPassword = (username, password) => {
    passwords.value.push({ 
      username,
      userEmail: '',
      password: '••••••••',
      decryptedPassword: password,
      notes: '',
      updatedAt: new Date().toISOString()
    })
  }
  
  const decryptPassword = async (username) => {
    // Simulate decryption delay
    await new Promise(resolve => setTimeout(resolve, 300))
    // Mock decrypted passwords based on username
    const mockPasswords = {
      'Personal Email': 'MySecurePassword123!',
      'Bank Account': 'BankPass789$',
      'Netflix': 'Streaming2023'
    }
    return mockPasswords[username] || 'decrypted-password'
  }

  const encryptPassword = async (password) => {
    // Simulate encryption
    await new Promise(resolve => setTimeout(resolve, 300))
    return '••••••••'
  }

  return {
    passwords,
    addPassword,
    decryptPassword,
    encryptPassword
  }
}