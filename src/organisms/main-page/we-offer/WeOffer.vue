<script setup>
import BaseCard from '@/atom/base-card/BaseCard.vue'
import weOffer from '@/mixins/offer.js'
</script>

<template>
  <div class="we-offer">
    <div class="container">
      <div class="we-offer__title">
        <h2>Ми пропонуємо:</h2>
      </div>

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
            <p>{{ item.content }}</p>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'WeOffer';
</style>
