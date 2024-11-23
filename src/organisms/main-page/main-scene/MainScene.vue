<script setup>
import BaseCard from '@/atom/base-card/BaseCard.vue'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'
</script>

<template>
  <div class="main-scene">
    <div class="container">
      <div class="main-scene__wrapper">
        <div class="main-scene__wrapper-info">
          <h1 class="main-scene__title">все навчання у твоєму пристрої</h1>

          <div class="main-scene__wrapper-card">
            <BaseCard bg-color="pink" class="base-user-card">
              <template #content>
                <div class="card">
                  <BaseButtonText>
                    приєднуйся до нашої спільноти зараз
                  </BaseButtonText>
                </div>
              </template>
            </BaseCard>

            <div class="main-scene__wrapper-or">
              АБО
              <img src="@/assets/img/main/line.png" alt="line" />
            </div>

            <BaseCard bg-color="pink" class="base-user-card">
              <template #content>
                <div class="card">
                  <BaseButtonText
                    tag="a"
                    href="https://moodle.mku.edu.ua/login/index.php"
                    target="_blank"
                  >
                    продовжуй навчання
                  </BaseButtonText>
                </div>
              </template>
            </BaseCard>
          </div>
        </div>

        <div class="main-scene__wrapper-img">
          <img src="@/assets/img/main/main-scene.svg" alt="main-scene" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'MainScene';
</style>
