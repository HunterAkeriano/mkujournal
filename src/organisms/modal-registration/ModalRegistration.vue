<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import { computed, ref } from 'vue'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'
import FormDatepicker from '@/atom/form-datepicker/FormDatepicker.vue'
import UniversitySelect from '@/atom/university-select/UniversitySelect.vue'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'
import { object, string, date } from 'yup'
import { useForm } from 'vee-validate'
import { validationEmail } from '@/molecules/utils/validation.js'
import { isValidPhoneNumber } from 'libphonenumber-js/max'
import { useToast } from 'vue-toastification'
import { registration } from '@/atom/axios/login.js'
import { getErrorMessages } from '@/molecules/utils/fetch-error.js'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})

const emit = defineEmits(['close', 'changeTypeModal'])

const toast = useToast()
const isPasswordType = ref(true)
const isPasswordTypeRecover = ref(true)

function changeTypeModal() {
  emit('changeTypeModal')
}

const schema = object({
  name: string().min(1).required(),
  surName: string().min(1).required(),
  dateCreated: date().required(),
  email: string()
    .required()
    .test('email', 'Email не правильний', (value) => {
      return validationEmail.test(value)
    }),
  password: string().min(8).required(),
  recPassword: string()
    .min(8)
    .required()
    .test('password-match', 'Паролі не співпадають', function (value) {
      return value === this.parent.password
    }),
  phone: string()
    .required()
    .default('')
    .test({
      test: (value) => (value ? isValidPhoneNumber(value) : true),
      message: 'Номер телефону не корректний',
    }),
  course: object().required(),
})

const form = useForm({
  validationSchema: schema,
  initialValues: schema.getDefault(),
})

const { values, errors, setFieldError } = form

async function closeModal() {
  const { valid } = await form.validate()

  if (!valid) return

  try {
    const result = await registration(
      values.email,
      values.password,
      values.name,
      values.surName,
      values.dateCreated,
      values.course.id,
      values.phone
    )

    if (result) {
      toast.success(result.message)
      toast.success('Очікуйте підтвердження вашого аккаунту')
      emit('close')
    }
  } catch (error) {
    const messages = getErrorMessages(error)
    messages.forEach((item) => toast.error(item))
    setFieldError(error.response?.data?.field, error.response?.data?.message)
  }
}

function closesModal() {
  emit('close')
}

const isFormValid = computed(() => {
  return Object.keys(errors.value).length === 0
})
</script>

<template>
  <ModalWindow
    :modal-index="props.modalIndex"
    is-registration
    close
    size="xl"
    class="registration-modal"
    @close="closesModal"
  >
    <template #header> РЕЄСТРАЦІЯ </template>

    <template #content>
      <div class="registration-modal__teacher">
        <img src="@/assets/img/modal/modal-teacher.png" alt="teacher" />
      </div>

      <div class="registration-modal__inputs">
        <FormInput name="name" placeholder="Ім'я" />

        <FormInput name="surName" placeholder="Прізвище" />

        <FormDatepicker
          name="dateCreated"
          is-datepicker
          mode="date"
          placeholder="Дата народження"
        />

        <FormInput name="email" placeholder="Е-mail" />

        <FormInput
          name="phone"
          is-phone
          type="tel"
          placeholder="Номер телефону"
        />

        <UniversitySelect name="course" />

        <div class="registration-modal__registration-password">
          <FormInput
            :type="isPasswordType ? 'password' : 'text'"
            name="password"
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
            :type="isPasswordTypeRecover ? 'password' : 'text'"
            name="recPassword"
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
