<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>

<template>
  <ModalWindow :modal-index="props.modalIndex" size="sm" @close="closeModal">
    <template #content> Я пидорас </template>
  </ModalWindow>
</template>

<style scoped></style>
