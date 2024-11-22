<script setup>
import Popper from 'vue3-popper'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'

const props = defineProps({
  placement: {
    type: String,
    default: 'auto',
  },
})
</script>

<template>
  <div class="base-tooltip">
    <Popper :placement="props.placement" hover>
      <template #default>
        <slot name="hover" />
      </template>
      <template #content>
        <BaseButtonText variant="info" size="sm" list>
          <slot name="hint" />
        </BaseButtonText>
      </template>
    </Popper>
  </div>
</template>

<style lang="scss" scoped>
@import 'BaseTooltip';
</style>
