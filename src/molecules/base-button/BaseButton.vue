<script setup>
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'button',
  },
  href: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  clickable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

function onClick(event) {
  emit('click', event)
}
</script>

<template>
  <Component
    :is="props.tag"
    :href="props.href || props.to"
    :to="props.to"
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :class="{ 'base-button_clickable': props.clickable }"
    class="base-button"
    @click="onClick"
  >
    <BaseIcon
      v-if="props.loading"
      icon="icon-loader-2"
      class="base-button__loading-icon"
    />

    <slot name="default" />
  </Component>
</template>

<style scoped lang="scss">
@import 'BaseButton';
</style>
