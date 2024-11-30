<script setup>
import ModalWindow from '@/atom/modal-window/ModalWindow.vue'
import FormInput from '@/atom/form-input/FormInput.vue'
import { ref } from 'vue'
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
import AvatarUpload from '@/atom/avatar-upload/AvatarUpload.vue'
import {
  getDownloadURL,
  storage,
  storageRef,
  uploadBytes,
} from '@/plugin/firebase/firebase.js'
import FormSelect from '@/atom/form-select/FormSelect.vue'

const props = defineProps({
  modalIndex: {
    type: Number,
  },
})

const emit = defineEmits(['close', 'changeTypeModal'])

const isLoading = ref(false)
const toast = useToast()
const isPasswordType = ref(true)
const isPasswordTypeRecover = ref(true)

const preloadedAvatar = ref(null)
const localAvatar = ref(null)

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
  gender: object().required(),
})

const form = useForm({
  validationSchema: schema,
  initialValues: schema.getDefault(),
})

const { values, setFieldError } = form

async function closeModal() {
  const { valid } = await form.validate()

  if (!valid) return
  isLoading.value = true
  let avatarUrl

  try {
    const date = Date.now()
    if (localAvatar.value !== null) {
      const pfpRef = storageRef(storage, 'profile-pictures/' + `pfp-${date}`)

      await uploadBytes(pfpRef, localAvatar.value).then(async () => {
        await getDownloadURL(
          storageRef(storage, 'profile-pictures/' + `pfp-${date}`)
        ).then((url) => {
          avatarUrl = url
        })
      })
    }

    const result = await registration(
      values.email,
      values.password,
      values.name,
      values.surName,
      values.dateCreated,
      values.course.id,
      values.phone,
      avatarUrl,
      values.gender.code
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
  } finally {
    isLoading.value = false
  }
}

function closesModal() {
  emit('close')
}

const genderDate = [
  {
    id: 0,
    name: 'Чоловіча',
    code: 'man',
  },
  {
    id: 1,
    name: 'Жіноча',
    code: 'female',
  },
]
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
        <div class="registration-modal__ava">
          <AvatarUpload
            v-model:preloaded-file="preloadedAvatar"
            v-model:local-file="localAvatar"
          />
        </div>

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
          type="text"
          placeholder="Номер телефону"
        />

        <UniversitySelect name="course" />

        <FormSelect
          :options="genderDate"
          :get-option-label="(item) => item.name"
          name="gender"
          placeholder="Стать"
        />

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
          :loading="isLoading"
          clickable
          class="registration-modal__btn"
          @click="closeModal"
        >
          Створити обліковий запис
        </BaseButton>

        <BaseButtonText
          :disabled="!isLoading"
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
