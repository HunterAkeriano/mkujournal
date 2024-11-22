<script setup></script>

<template>
  <div class="accordion">
    <div class="accordion__title">
      <slot name="title" />
    </div>

    <div class="accordion__body">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'BaseAccordion';
</style>
