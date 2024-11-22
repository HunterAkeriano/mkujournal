<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/organisms/header/TheHeader.vue'
import IconsManager from '@/organisms/icons-manager/IconsManager.vue'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'
import { ref } from 'vue'

const isActiveScroll = ref(false)

const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

const handleScroll = () => {
  if (window.scrollY > 20) {
    isActiveScroll.value = true
    return
  }
  isActiveScroll.value = false
}

window.addEventListener('scroll', handleScroll)

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <TheHeader />

  <RouterView />

  <div class="container">
    <div
      :class="{ 'scroll-top_visible': isActiveScroll }"
      class="scroll-top"
      ref="scrollTop"
    >
      <BaseIcon icon="icon-top" class="global-top" @click="scrollToTop" />
    </div>
  </div>

  <IconsManager />
</template>

<style></style>
