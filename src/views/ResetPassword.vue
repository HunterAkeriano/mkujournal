<script setup>
import { onMounted, ref } from 'vue'
import { checkResetToken, login, setNewPassword } from '@/atom/axios/login.js'
import { useRoute, useRouter } from 'vue-router'
import { getErrorMessages } from '@/molecules/utils/fetch-error.js'
import { useToast } from 'vue-toastification'
import FormInput from '@/atom/form-input/FormInput.vue'
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import { useAuthStore } from '@/plugin/stores/auth-storage.js'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

const toast = useToast()
const userInfo = ref(null)
const isPasswordType = ref(true)
const isPasswordTypeRecover = ref(true)
const isLoading = ref(false)

const schema = object({
  password: string().min(8).required(),
  recPassword: string()
    .min(8)
    .required()
    .test('password-match', 'Паролі не співпадають', function (value) {
      return value === this.parent.password
    }),
})

const form = useForm({
  validationSchema: schema,
  initialValues: schema.getDefault(),
})

const { values } = form

async function checkResetTokenUser() {
  try {
    const result = await checkResetToken(route.params.id)

    if (result) {
      userInfo.value = result
    }
  } catch (error) {
    const messages = getErrorMessages(error)
    messages.forEach((item) => toast.error(item))
    await router.push('/')
  }
}

async function updatePassword() {
  const { valid } = await form.validate()

  if (!valid) return

  isLoading.value = true

  try {
    const setPassword = await setNewPassword(route.params.id, values.password)
    if (setPassword) {
      const auth = await login(userInfo.value.email, values.password)

      if (auth) {
        authStore.setTokens(auth.accessToken, auth.refreshToken, true)
        await authStore.fetchData()
        await router.push('/')
        toast.success('Ви успішно змінили пароль')
      }
    }
  } catch (error) {
    const messages = getErrorMessages(error)
    messages.forEach((item) => toast.error(item))
    await router.push('/')
  } finally {
    isLoading.value = false
  }
}

onMounted(checkResetTokenUser)
</script>

<template>
  <div class="reset-password__bg">
    <img src="@/assets/img/modal-registration.webp" alt="modal registration" />
  </div>

  <div class="reset-password">
    <div class="container">
      <div class="reset-password__title">
        <h2>Відновлення паролю</h2>
      </div>

      <div class="reset-password__user" v-if="userInfo">
        <div class="reset-password__user-img">
          <img :src="userInfo.photo" alt="user" />
        </div>

        <div>
          <p>{{ userInfo.full_name }}</p>
          <span>
            {{ userInfo.role === 'student' ? 'Студент' : 'Викладач' }}
          </span>
        </div>
      </div>

      <div class="reset-password__inputs">
        <div class="reset-password__inputs-password">
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

        <div class="reset-password__inputs-password">
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
      </div>

      <div class="reset-password__btn">
        <BaseButton
          :loading="isLoading"
          clickable
          class="registration-modal__btn"
          @click="updatePassword"
        >
          Увійти в особистий кабінет
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables/colors';

.reset-password {
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 600px;
  margin: -50px auto;
  min-height: 500px;
  position: relative;
  z-index: 1;

  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 40px;
  }

  &__user {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;

    &-img {
      width: 120px;
      height: 120px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    p {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 5px;
    }
  }

  &__inputs {
    margin: 60px 0;

    &-password {
      position: relative;
      margin-bottom: 30px;
    }

    svg {
      position: absolute;
      right: 10px;
      top: -5px;
      width: 23px;
      height: 23px;
      cursor: pointer;
      stroke: $black;
    }
  }
}
</style>
