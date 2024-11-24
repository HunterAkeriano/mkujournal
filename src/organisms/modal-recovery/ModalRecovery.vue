<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import { boolean, object, string } from 'yup'
import { validationEmail } from '@/molecules/utils/validation.js'
import { useForm } from 'vee-validate'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import { resetPassword } from '@/atom/axios/login.js'
import { useToast } from 'vue-toastification'
import { getErrorMessages } from '@/molecules/utils/fetch-error.js'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})

const emit = defineEmits(['close'])

const toast = useToast()
function closesModal() {
  emit('close')
}

const schema = object({
  email: string()
    .required()
    .test('email', 'Email не правильний', (value) => {
      return validationEmail.test(value)
    }),
})

const form = useForm({
  validationSchema: schema,
  initialValues: schema.getDefault(),
})

const { values, setFieldError } = form

async function recoveryPassword() {
  const { valid } = await form.validate()

  if (!valid) return

  try {
    const result = await resetPassword(values.email)

    if (result) {
      toast.success(result.message)
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
    size="md"
    class="recovery-modal"
    @close="closesModal"
  >
    <template #header> Відновлення паролю </template>

    <template #content>
      <div class="recovery-modal__inputs">
        <div class="recovery-modal__bg">
          <img src="@/assets/img/modal/modal-login.png" alt="login" />
        </div>

        <FormInput name="email" placeholder="Введіть email" />

        <BaseButton clickable @click="recoveryPassword">
          Відновити пароль
        </BaseButton>
      </div>
    </template>
  </ModalWindow>
</template>

<style scoped lang="scss">
@import 'ModalRecovery';
</style>
