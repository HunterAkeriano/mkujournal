<script setup>
import BaseButton from '@/molecules/base-button-text/BaseButtonText.vue'
import ModalContainer from '@/atom/modal-container/ModalContainer.vue'
import { useToggleModal } from '@/molecules/toggle-modal/toggle-modal.js'
import ModalRegistration from '@/organisms/modal-registration/ModalRegistration.vue'
import { ref } from 'vue'
import ModalLogin from '@/organisms/modal-login/ModalLogin.vue'
import { useAuthStore } from '@/plugin/stores/auth-storage.js'
import BaseDropDown from '@/molecules/base-dropdown/BaseDropDown.vue'
import { useRouter } from 'vue-router'
import ModalRecovery from '@/organisms/modal-recovery/ModalRecovery.vue'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'

const registrationModal = useToggleModal()
const loginModal = useToggleModal()
const recoveryModal = useToggleModal()

const router = useRouter()

const isOpenMenu = ref(false)
const authStore = useAuthStore()

function changeTypeModal() {
  registrationModal.close()
  loginModal.open()
}

function changeLoginType() {
  loginModal.close()
  registrationModal.open()
}

function openModalLogin() {
  loginModal.open()
  isOpenMenu.value = false
}

function openModalRegistration() {
  registrationModal.open()
  isOpenMenu.value = false
}

async function logout(toggleDropdown) {
  await authStore.signout()
  await router.replace('/')
  toggleDropdown()
}

function resendPasswordModal() {
  loginModal.close()
  recoveryModal.open()
}
</script>

<template>
  <header :class="{ header_user: authStore.user }" class="header">
    <div class="container">
      <div class="header__wrapper">
        <BaseButton tag="RouterLink" to="/" class="header__link">
          mku-journal.com.ua
        </BaseButton>

        <div class="header__logo">
          <img src="@/assets/img/logo.svg" alt="logo" />
        </div>

        <div class="header__btn" v-if="!authStore.user">
          <BaseButton
            clickable
            class="header__btn-item"
            @click="loginModal.open"
          >
            Вхід
          </BaseButton>
          <BaseButton
            clickable
            class="header__btn-item"
            @click="registrationModal.open"
          >
            Реєстрація
          </BaseButton>
        </div>

        <div class="header__btn" v-else>
          <BaseDropDown>
            <template #default="{ toggleDropdown }">
              <div class="user" @click="toggleDropdown">
                <img
                  v-if="authStore.user.user_photo"
                  :src="authStore.user.user_photo"
                />

                {{ authStore.user.sur_name + ' ' + authStore.user.name }}
              </div>
            </template>

            <template #content="{ toggleDropdown }">
              <BaseButtonText
                class="user__content"
                to="/profile"
                tag="RouterLink"
              >
                Профіль
              </BaseButtonText>

              <span class="user__content" @click="logout(toggleDropdown)">
                Вийти
              </span>
            </template>
          </BaseDropDown>

          <BaseButton clickable class="header__btn-item"> Розклад </BaseButton>

          <BaseButton clickable class="header__btn-item"> Завдання </BaseButton>

          <BaseButton clickable class="header__btn-item"> Оцінки </BaseButton>
        </div>

        <div
          :class="{ 'header__mobile-btn_opened': isOpenMenu }"
          class="header__mobile-btn"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <div
      :class="{ 'header__mobile-content_opened': isOpenMenu }"
      class="header__mobile-content"
    >
      <div class="header__mobile-link" v-if="!authStore.user">
        <BaseButton clickable class="header__btn-item" @click="openModalLogin">
          Вхід
        </BaseButton>

        <BaseButton
          clickable
          class="header__btn-item"
          @click="openModalRegistration"
        >
          Реєстрація
        </BaseButton>

        <BaseButton clickable class="header__btn-item"> Питання </BaseButton>
      </div>

      <div class="header__mobile-link" v-else>
        <BaseDropDown>
          <template #default="{ toggleDropdown }">
            <div class="user" @click="toggleDropdown">
              <img
                v-if="authStore.user.user_photo"
                :src="authStore.user.user_photo"
                alt="user"
              />

              {{ authStore.user.sur_name + ' ' + authStore.user.name }}
            </div>
          </template>

          <template #content="{ toggleDropdown }">
            <BaseButtonText
              class="user__content"
              to="/profile"
              tag="RouterLink"
            >
              Профіль
            </BaseButtonText>

            <span class="user__content" @click="toggleDropdown">Вийти</span>
          </template>
        </BaseDropDown>

        <BaseButton clickable class="header__btn-item"> Розклад </BaseButton>

        <BaseButton clickable class="header__btn-item"> Завдання </BaseButton>

        <BaseButton clickable class="header__btn-item"> Оцінки </BaseButton>
      </div>

      <div class="header__mobile-logo">
        <img src="@/assets/img/logo.svg" alt="logo" />
      </div>

      <!--      <div class="header__mobile-bg">-->
      <!--        <img src="@/assets/img/header-mobile.png" alt="header-mobile" />-->
      <!--      </div>-->
    </div>
  </header>

  <ModalContainer>
    <template #default="{ modalIndex }">
      <ModalLogin
        v-if="loginModal.item"
        :modal-index="modalIndex"
        @close="loginModal.close"
        @change-type-modal="changeLoginType"
        @resend-password-modal="resendPasswordModal"
      />
    </template>
  </ModalContainer>

  <ModalContainer>
    <template #default="{ modalIndex }">
      <ModalRecovery
        v-if="recoveryModal.item"
        :modal-index="modalIndex"
        @close="recoveryModal.close"
        @change-type-modal="changeTypeModal"
      />
    </template>
  </ModalContainer>

  <ModalContainer>
    <template #default="{ modalIndex }">
      <ModalRegistration
        v-if="registrationModal.item"
        :modal-index="modalIndex"
        @close="registrationModal.close"
        @change-type-modal="changeTypeModal"
      />
    </template>
  </ModalContainer>
</template>

<style lang="scss" scoped>
@import 'TheHeader';
</style>
