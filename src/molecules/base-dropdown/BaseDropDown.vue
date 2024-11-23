<script lang="ts" setup>
import Popper from 'vue3-popper'
import { ref } from 'vue'

const props = defineProps({
  open: Boolean,
  placement: String,
  offsetDistance: String,
})

const opened = ref(props.open)
const inputRef = ref<HTMLInputElement>()
const optionsContainerRef = ref<HTMLElement | null>(null)

function onFocus() {
  openDropdown()
}

function onBlur() {
  closeDropdown()
}

function toggleDropdown() {
  if (opened.value) {
    inputRef.value?.blur()
    return
  }

  inputRef.value?.focus()
}

function openDropdown() {
  opened.value = true
}

function closeDropdown() {
  if (props.open) {
    return
  }

  opened.value = false
}
</script>

<template>
  <div class="base-dropdown">
    <Popper
      :placement="props.placement"
      :show="opened"
      :offset-distance="props.offsetDistance"
      class="base-dropdown__container"
    >
      <template #default>
        <div class="base-dropdown__content" @pointerdown.stop.prevent>
          <slot
            name="default"
            :opened="opened"
            :toggle-dropdown="toggleDropdown"
          />

          <input
            ref="inputRef"
            type="text"
            class="base-dropdown__activator"
            readonly
            @focus="onFocus"
            @blur="onBlur"
          />
        </div>
      </template>

      <template #content>
        <slot name="content-wrapper">
          <slot name="content-head" />

          <div
            ref="optionsContainerRef"
            class="base-dropdown__popover"
            @pointerdown.prevent.stop
          >
            <slot
              name="content"
              :opened="opened"
              :toggle-dropdown="toggleDropdown"
            />
          </div>
        </slot>
      </template>
    </Popper>
  </div>
</template>

<style lang="scss" scoped>
@import 'BaseDropdown';
</style>
