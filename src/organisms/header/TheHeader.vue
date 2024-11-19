<script setup>
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import ModalContainer from '@/atom/modal-container/ModalContainer.vue'
import { useToggleModal } from '@/molecules/toggle-modal/toggle-modal.js'
import ModalRegistration from '@/organisms/modal-registration/ModalRegistration.vue'

const registrationModal = useToggleModal()
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <BaseButton tag="RouterLink" to="/" class="header__link">
          mkujournal.com.ua
        </BaseButton>

        <div class="header__logo">
          <img src="@/assets/logo.svg" alt="" />
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
      </div>
    </div>
  </header>

  <ModalContainer>
    <template #default="{ modalIndex }">
      <ModalRegistration
        v-if="registrationModal.item"
        :modal-index="modalIndex"
      />
    </template>
  </ModalContainer>
</template>

<style scoped>
@import 'TheHeader.scss';
</style>
