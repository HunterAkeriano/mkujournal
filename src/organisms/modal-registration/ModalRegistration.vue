<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import { ref } from 'vue'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'
import FormDatepicker from '@/atom/form-datepicker/FormDatepicker.vue'
import UniversitySelect from '@/atom/university-select/UniversitySelect.vue'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})

const emit = defineEmits(['close', 'changeTypeModal'])
const isPasswordType = ref(true)
const isPasswordTypeRecover = ref(true)

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

        <div class="registration-modal__registration-password">
          <FormInput
            v-model="password"
            :type="isPasswordType ? 'password' : 'text'"
            placeholder="Пароль"
          />
          <BaseIcon
            :icon="isPasswordType ? 'icon-eye-closed' : 'icon-eye'"
            class="form-input__icon"
            @click="isPasswordType = !isPasswordType"
          />
        </div>

        <div class="registration-modal__registration-password">
          <FormInput
            v-model="recPassword"
            :type="isPasswordTypeRecover ? 'password' : 'text'"
            placeholder="Підтвердження паролю"
          />

          <BaseIcon
            :icon="isPasswordTypeRecover ? 'icon-eye-closed' : 'icon-eye'"
            class="form-input__icon"
            @click="isPasswordTypeRecover = !isPasswordTypeRecover"
          />
        </div>

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
