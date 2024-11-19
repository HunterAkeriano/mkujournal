<script setup>
import { useModalStorage } from '@/plugin/stores/modal-storage.js'
import { ref } from 'vue'

const modalStorage = useModalStorage()

const modalIndex = ref(-1)

function onBeforeEnter() {
  modalIndex.value = modalStorage.open()
}

function onAfterLeave() {
  modalStorage.close()
}
</script>

<template>
  <Teleport to="#modals">
    <Transition
      name="modals"
      @before-enter="onBeforeEnter"
      @after-leave="onAfterLeave"
    >
      <slot :modal-index="modalIndex" />
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped></style>
