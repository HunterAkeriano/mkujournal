<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/organisms/header/TheHeader.vue'
import IconsManager from '@/organisms/icons-manager/IconsManager.vue'
</script>

<template>
  <TheHeader />

  <RouterView />

  <IconsManager />
</template>

<style scoped></style>
