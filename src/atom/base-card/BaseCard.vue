<script setup>
const props = defineProps({
  bgColor: {
    type: String,
    default: 'white',
  },
})
</script>

<template>
  <div
    :class="{
      [`base-card_${props.bgColor}`]: true,
    }"
    class="base-card"
  >
    <slot name="header" />
    <slot name="content" />
  </div>
</template>

<style scoped lang="scss">
@import 'BaseCard';
</style>
