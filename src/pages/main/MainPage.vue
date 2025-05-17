<script setup lang="ts">
import { AuthApi, useApi } from '@/shared'

const api = useApi(AuthApi)

async function getCatalog() {
  try {
    const { data } = await api.authLoginPost({
      authLoginPostRequest: {
        email: 'dimonmoy@meta.ua',
        password: '12345678',
      },
    })
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

getCatalog()
</script>

<template>
  <div class="lol">
    <input type="text" />
    <input type="text" />
  </div>
</template>

<style scoped lang="scss">
@use './MainPage';
</style>
