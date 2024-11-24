<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import { boolean, object, string } from 'yup'
import { validationEmail } from '@/molecules/utils/validation.js'
import { useForm } from 'vee-validate'
import BaseButton from '@/molecules/base-button/BaseButton.vue'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})

const emit = defineEmits(['close'])

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

        <BaseButton clickable> Відновити пароль </BaseButton>
      </div>
    </template>
  </ModalWindow>
</template>

<style scoped lang="scss">
@import 'ModalRecovery';
</style>
