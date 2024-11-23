<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import { object, string } from 'yup'
import { validationEmail } from '@/molecules/utils/validation.js'
import { useForm } from 'vee-validate'
import { getErrorMessages } from '@/molecules/utils/fetch-error.js'
import { useToast } from 'vue-toastification'
import { login } from '@/atom/axios/login.js'
import { useAuthStore } from '@/plugin/stores/auth-storage.js'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})
const toast = useToast()
const authStore = useAuthStore()

const emit = defineEmits(['close', 'changeTypeModal'])

const schema = object({
  email: string()
    .required()
    .test('email', 'Email не правильний', (value) => {
      return validationEmail.test(value)
    }),
  password: string().min(8).required(),
})

const form = useForm({
  validationSchema: schema,
  initialValues: schema.getDefault(),
})

const { values, errors, setFieldError } = form

function closesModal() {
  emit('close')
}

async function closeModal() {
  const { valid } = await form.validate()

  if (!valid) return

  try {
    const result = await login(values.email, values.password)
    if (result) {
      authStore.setTokens(result.accessToken, result.refreshToken)
      await authStore.fetchData()
      toast.success('Ви успішно авторизувались')
      emit('close')
    }
  } catch (error) {
    const messages = getErrorMessages(error)
    messages.forEach((item) => toast.error(item))
    setFieldError(error.response?.data?.field, error.response?.data?.message)
  }
}
</script>

<template>
  <ModalWindow
    :modal-index="props.modalIndex"
    is-registration
    close
    size="xl"
    class="login-modal"
    @close="closesModal"
  >
    <template #header> Вхід на сайт </template>

    <template #content>
      <div class="login-modal__inputs">
        <FormInput name="email" placeholder="Email користувача" />

        <FormInput name="password" placeholder="Пароль" type="password" />

        <BaseButtonText>
          <p class="login-modal__info">
            Немає аккаунту?
            <span class="login-modal__register">Зареєструватись</span>
          </p>
        </BaseButtonText>

        <BaseButton clickable class="login-modal__btn" @click="closeModal">
          Увійти
        </BaseButton>
      </div>
    </template>
  </ModalWindow>
</template>

<style scoped lang="scss">
@import 'ModalLogin';
</style>
