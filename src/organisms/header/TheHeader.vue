<script setup>
import BaseButton from '@/molecules/base-button/BaseButton.vue'
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
          <BaseButton clickable class="header__btn-item">
            Реєстрація
          </BaseButton>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import 'TheHeader.scss';
</style>
