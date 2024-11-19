<script setup>
import { ref } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  modalIndex: {
    type: Number,
  },
  size: {
    type: String,
    default: 'sm',
  },
  background: {
    type: String,
    default: 'light',
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
  closeOnBackground: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close'])

const contentClick = ref(false)
const hideOverflow = ref(false)

function onPointerdown(_, isContent) {
  contentClick.value = isContent || contentClick.value
}

function enableOverflow() {
  hideOverflow.value = true
}
function disableOverflow() {
  hideOverflow.value = false
}

function resetContentClickValue() {
  contentClick.value = false
}

function onDialogClick(event) {
  if (event.target === event.currentTarget || props.size === 'full') {
    close(false)
  }
}

function close(hard = false) {
  if (!hard && contentClick.value === true) {
    resetContentClickValue()
    return
  }

  if (!hard && !props.closeOnBackground) {
    return
  }

  emit('close')
}
</script>

<template>
  <Component
    :is="props.tag"
    :style="{
      zIndex: props.modalIndex,
    }"
    class="base-modal"
    @pointerdown="onPointerdown($event, false)"
  >
    <div class="base-modal__wrapper">
      <dialog
        :class="{
          [`base-modal__container_background-${props.background}`]: true,
        }"
        class="base-modal__container"
        @click="onDialogClick($event)"
      >
        <div v-if="$slots.header" class="base-modal__header">
          <slot name="header" />
        </div>

        <div
          class="base-modal__content"
          :class="{
            [`base-modal__content_no-padding`]: props.noPadding,
          }"
          @pointerdown="onPointerdown($event, true)"
          @pointerup="resetContentClickValue"
        >
          <slot
            :enable-overflow="enableOverflow"
            :disable-overflow="disableOverflow"
            name="content"
          >
            <div class="base-modal__content-inner">
              <slot name="content-inner" />
            </div>
          </slot>

          <div v-if="$slots.footer" class="base-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </dialog>
    </div>
  </Component>
</template>

<style scoped>
@import '../modal-window/ModalWindow.scss';
</style>
