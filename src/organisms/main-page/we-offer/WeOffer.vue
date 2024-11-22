<script setup>
import BaseCard from '@/atom/base-card/BaseCard.vue'
import weOffer from '@/mixins/offer.js'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/scss'
import 'swiper/scss/pagination'
import BaseTooltip from '@/molecules/base-tooltip/BaseTooltip.vue'
</script>

<template>
  <div class="we-offer__title">
    <h2>Ми пропонуємо:</h2>
  </div>

  <div class="we-offer">
    <div class="we-offer__bg">
      <img src="@/assets/img/main/bg.png" alt="bg" />
    </div>

    <div class="container">
      <div class="we-offer__cards">
        <BaseCard
          v-for="item in weOffer"
          :key="item.id"
          bg-color="white"
          class="we-offer__cards-item"
        >
          <template #header>
            <h5>{{ item.name }}</h5>
          </template>

          <template #content>
            <BaseTooltip placement="bottom">
              <template #hover>
                <p>{{ item.content }}</p>
              </template>

              <template #hint> {{ item.pooper }} </template>
            </BaseTooltip>
          </template>
        </BaseCard>
      </div>
    </div>

    <div class="we-offer__swiper">
      <swiper
        :centered-slides="true"
        :loop="true"
        space-between="20"
        slides-per-view="1.5"
      >
        <swiper-slide v-for="item in weOffer" :key="item.id">
          <BaseCard bg-color="white" class="we-offer__cards-item">
            <template #header>
              <h5>{{ item.name }}</h5>
            </template>

            <template #content>
              <p>{{ item.content }}</p>
            </template>
          </BaseCard>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'WeOffer';
</style>
