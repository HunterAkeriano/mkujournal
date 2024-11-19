import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useScrollLock } from '@/molecules/scroll-lock/scroll-lock.js'

export const useModalStorage = defineStore('modal', () => {
  const { lockScroll, unlockScroll } = useScrollLock()

  const indexCounter = ref(0)
  let openedModalsCount = 0

  function open() {
    if (openedModalsCount === 0) {
      lockScroll()
    }

    openedModalsCount++

    return indexCounter.value++
  }

  function close() {
    openedModalsCount--

    if (openedModalsCount <= 0) {
      openedModalsCount = 0
      indexCounter.value = 0

      unlockScroll()
    }
  }

  return {
    open,
    close,
  }
})
