<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import { ref } from 'vue'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'
import FormDatepicker from '@/atom/form-datepicker/FormDatepicker.vue'
import UniversitySelect from '@/atom/university-select/UniversitySelect.vue'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})

const emit = defineEmits(['close', 'changeTypeModal'])
const name = ref('')
const surName = ref('')
const weekDay = ref(null)
const email = ref('')
const phoneNumber = ref('')
const typeStudent = ref('')
const password = ref('')
const recPassword = ref('')

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
      <div class="registration-modal__teacher">
        <img src="@/assets/img/modal/modal-teacher.png" alt="teacher" />
      </div>

      <div class="registration-modal__inputs">
        <FormInput v-model="name" placeholder="Ім'я" />

        <FormInput v-model="surName" placeholder="Прізвище" />

        <FormDatepicker
          v-model="weekDay"
          is-datepicker
          mode="date"
          placeholder="Дата народження"
        />

        <FormInput v-model="email" placeholder="Е-mail" />

        <FormInput
          v-model="phoneNumber"
          is-phone
          type="tel"
          placeholder="Номер телефону"
        />

        <UniversitySelect v-model="typeStudent" />

        <FormInput v-model="password" type="password" placeholder="Пароль" />

        <FormInput
          v-model="recPassword"
          type="password"
          placeholder="Підтвердження паролю"
        />

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

      <div class="registration-modal__students">
        <img src="@/assets/img/modal/modal-students.png" alt="students" />
      </div>
    </template>
  </ModalWindow>
</template>

<style lang="scss" scoped>
@import 'ModalRegistration';
</style>
