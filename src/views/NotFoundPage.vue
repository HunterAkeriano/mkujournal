<script setup>
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

async function goToMain() {
  await router.push('/')
}
</script>

<template>
  <div class="error">
    <div class="error__container">
      <div class="error__container-text">
        <h1>404</h1>

        <p>Упс... Щось пішло не так</p>

        <div class="error__container-btn">
          <BaseButton clickable @click="goToMain">
            повернутись на головну
          </BaseButton>
        </div>
      </div>

      <div class="error__container-img">
        <img src="@/assets/img/404.png" alt="404" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/media-breakpoints';

.error {
  margin-top: -60px;

  @include media-breakpoint-down(md) {
    margin-top: 40px;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    align-items: center;

    @include media-breakpoint-down(md) {
      grid-template-columns: repeat(1, 1fr);
    }

    &-text {
      text-align: center;
      margin-top: -100px;

      h1 {
        font-size: 200px;
        font-weight: 700;
        margin-bottom: 20px;

        @include media-breakpoint-down(l) {
          font-size: 100px;
        }
      }

      p {
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 20px;

        @include media-breakpoint-down(l) {
          font-size: 20px;
        }
      }
    }

    &-btn {
      max-width: 400px;
      margin: 0 auto;
    }

    &-img {
      width: 100%;
      aspect-ratio: 1;
      position: relative;

      @include media-breakpoint-down(md) {
        margin-top: 20px;
      }

      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        @include media-breakpoint-down(md) {
          object-position: 128px 1px;
        }

        @include media-breakpoint-down(xs) {
          object-position: 28px 1px;
        }
      }
    }
  }
}
</style>
