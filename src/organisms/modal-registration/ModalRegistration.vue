<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'

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
  <ModalWindow
    :modal-index="props.modalIndex"
    is-registration
    size="xl"
    class="registration-modal"
    @close="closeModal"
  >
    <template #header> РЕЄСТРАЦІЯ </template>
    <template #content>
      <div class="registration-modal__inputs">
        <FormInput />
      </div>
    </template>
  </ModalWindow>
</template>

<style lang="scss" scoped>
@import 'ModalRegistration';
</style>
