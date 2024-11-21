<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'default',
  },
  clickable: {
    type: Boolean,
    default: undefined,
  },
})

const icon = computed(() => `#${props.icon}`)
</script>

<template>
  <svg
    :class="{
      [`base-icon_size-${props.size}`]: true,
      'base-icon_clickable': props.clickable,
    }"
    class="base-icon"
  >
    <use :href="icon" />
  </svg>
</template>

<style lang="scss" scoped>
@import 'BaseIcon';
</style>
