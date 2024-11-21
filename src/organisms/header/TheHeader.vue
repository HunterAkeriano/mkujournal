<script setup>
import BaseButton from '@/molecules/base-button-text/BaseButtonText.vue'
import ModalContainer from '@/atom/modal-container/ModalContainer.vue'
import { useToggleModal } from '@/molecules/toggle-modal/toggle-modal.js'
import ModalRegistration from '@/organisms/modal-registration/ModalRegistration.vue'
import { ref } from 'vue'

const registrationModal = useToggleModal()
const isOpenMenu = ref(false)

function changeTypeModal() {
  //todo: add modal login

  registrationModal.close()
}

function openModalRegistration() {
  registrationModal.open()
  isOpenMenu.value = false
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <BaseButton tag="RouterLink" to="/" class="header__link">
          mkujournal.com.ua
        </BaseButton>

        <div class="header__logo">
          <img src="@/assets/img/logo.svg" alt="" />
        </div>

        <div class="header__btn">
          <BaseButton clickable class="header__btn-item"> Вхід </BaseButton>
          <BaseButton
            clickable
            class="header__btn-item"
            @click="registrationModal.open"
          >
            Реєстрація
          </BaseButton>
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
      <div class="header__mobile-link">
        <BaseButton clickable class="header__btn-item"> Вхід </BaseButton>
        <BaseButton
          clickable
          class="header__btn-item"
          @click="openModalRegistration"
        >
          Реєстрація
        </BaseButton>
        <BaseButton clickable class="header__btn-item"> Питання </BaseButton>
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
