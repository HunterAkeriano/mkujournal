<script setup lang="ts">

import Input from '@/components/input/Input.vue'
import { ref } from 'vue'
import { AuthApi, useApi } from '@/shared'
import { useAuthStore } from '@/shared/store/auth-store'
import { useRouter } from 'vue-router'



const valueEmail = ref('')
const valuePassword = ref('')
const api = useApi(AuthApi)

const authStore = useAuthStore()
const roter = useRouter()

async function loginSubmit() {
  try {
    const { data } = await api.authLoginPost({
      authLoginPostRequest: {
        email: valueEmail.value,
        password: valuePassword.value,
      },
    })
    authStore.setTokens(data.accessToken, data.refreshToken)
   await roter.push('/')
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>

  <Input type="email" v-model="valueEmail"/>
  <Input type="password" v-model="valuePassword"/>
  <button @click="loginSubmit">Login</button>
  {{ valuePassword}}
  {{valueEmail}}
</template>

<style scoped>

</style>