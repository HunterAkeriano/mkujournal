<script setup>
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'
</script>

<template>
  <div class="accordion">
    <div class="accordion__title">
      <slot name="title" />

      <BaseIcon icon="icon-arrow" />
    </div>

    <div class="accordion__body">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'BaseAccordion';
</style>
