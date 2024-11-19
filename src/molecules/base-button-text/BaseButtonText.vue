<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'a',
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
    <slot name="default" />
  </Component>
</template>

<style scoped>
@import 'BaseButtonText.scss';
</style>
