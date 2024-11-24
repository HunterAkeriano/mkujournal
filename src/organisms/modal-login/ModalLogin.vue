<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import { boolean, object, string } from 'yup'
import { validationEmail } from '@/molecules/utils/validation.js'
import { useForm } from 'vee-validate'
import { getErrorMessages } from '@/molecules/utils/fetch-error.js'
import { useToast } from 'vue-toastification'
import { login } from '@/atom/axios/login.js'
import { useAuthStore } from '@/plugin/stores/auth-storage.js'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'
import CheckBox from '@/molecules/checkbox/CheckBox.vue'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})
const toast = useToast()
const authStore = useAuthStore()

const emit = defineEmits(['close', 'changeTypeModal', 'resendPasswordModal'])

const schema = object({
  email: string()
    .required()
    .test('email', 'Email не правильний', (value) => {
      return validationEmail.test(value)
    }),
  password: string().min(8).required(),
  rememberMe: boolean().required().default(false),
})

const form = useForm({
  validationSchema: schema,
  initialValues: schema.getDefault(),
})

const { values, setFieldError } = form

function closesModal() {
  emit('close')
}

async function closeModal() {
  const { valid } = await form.validate()

  if (!valid) return

  try {
    const result = await login(values.email, values.password)
    if (result) {
      authStore.setTokens(
        result.accessToken,
        result.refreshToken,
        values.rememberMe
      )
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

function changeTypeModal() {
  emit('changeTypeModal')
}

function openResendPassword() {
  emit('resendPasswordModal')
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
        <div class="login-modal__bg">
          <img src="@/assets/img/modal/modal-login.png" alt="login" />
        </div>

        <div class="login-modal__logo">
          <img src="@/assets/img/logo.svg" alt="logo" />
        </div>

        <FormInput name="email" placeholder="Email користувача" />

        <FormInput name="password" placeholder="Пароль" type="password" />

        <div class="login-modal__remember">
          <CheckBox name="rememberMe"> Запам'ятати мене </CheckBox>

          <BaseButtonText @click="changeTypeModal">
            <p class="login-modal__info">
              <span class="login-modal__register">Зареєструватись</span>
            </p>
          </BaseButtonText>
        </div>

        <div class="btn">
          <BaseButton clickable class="login-modal__btn" @click="closeModal">
            Увійти
          </BaseButton>

          <BaseButtonText
            tag="p"
            clickable
            class="btn__up"
            @click="openResendPassword"
          >
            <span class="btn__resend">Забули пароль?</span>
          </BaseButtonText>
        </div>
      </div>
    </template>
  </ModalWindow>
</template>

<style scoped lang="scss">
@import 'ModalLogin';
</style>
