<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import { ref } from 'vue'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})

const emit = defineEmits(['close', 'changeTypeModal'])
const name = ref('')

function closeModal() {
  emit('close')
}

function changeTypeModal() {
  emit('changeTypeModal')
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
        <FormInput v-model="name" placeholder="Ім'я" />
        <FormInput v-model="name" placeholder="Прізвище" />
        <FormInput v-model="name" placeholder="Дата народження" />
        <FormInput v-model="name" placeholder="Е-mail" />
        <FormInput v-model="name" placeholder="Номер телефону" />
        <FormInput v-model="name" placeholder="Факультет" />
        <FormInput v-model="name" placeholder="Пароль" />
        <FormInput v-model="name" placeholder="Підтвердження паролю" />

        <BaseButton
          clickable
          class="registration-modal__btn"
          @click="closeModal"
        >
          Створити обліковий запис
        </BaseButton>

        <BaseButtonText
          clickable
          class="registration-modal__login"
          @click="changeTypeModal"
        >
          Маєте аккаунт? <span>Увійти</span>
        </BaseButtonText>
      </div>
    </template>
  </ModalWindow>
</template>

<style lang="scss" scoped>
@import 'ModalRegistration';
</style>
