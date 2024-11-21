<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/organisms/header/TheHeader.vue'
import IconsManager from '@/organisms/icons-manager/IconsManager.vue'

const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()
</script>

<template>
  <TheHeader />

  <RouterView />

  <IconsManager />
</template>

<style scoped></style>
