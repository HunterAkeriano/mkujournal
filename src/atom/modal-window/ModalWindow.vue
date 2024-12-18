<script setup>
import { ref } from 'vue'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'

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
  isRegistration: {
    type: Boolean,
    default: false,
  },
  close: {
    type: Boolean,
    default: false,
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

function closeModal() {
  emit('close')
}
</script>

<template>
  <Component
    :is="props.tag"
    :style="{
      zIndex: props.modalIndex + 100,
    }"
    :class="{
      [`base-modal_size-${props.size}`]: true,
      [`base-modal_hide-overflow`]: hideOverflow,
    }"
    class="base-modal"
    @pointerdown="onPointerdown($event, false)"
  >
    <div class="base-modal__wrapper">
      <dialog
        :class="{
          [`base-modal_size-${props.size}`]: true,
          [`base-modal__container_background-${props.background}`]: true,
          [`base-modal_hide-overflow`]: hideOverflow,
        }"
        class="base-modal__container"
        @click="onDialogClick($event)"
      >
        <div v-if="$slots.header" class="base-modal__header">
          <slot name="header" />

          <div class="base-modal__close" @click="closeModal">
            <BaseIcon
              v-if="props.close"
              icon="icon-close"
              class="base-modal__close-icon"
            />
          </div>
        </div>

        <div
          class="base-modal__content"
          :class="{
            [`base-modal__content_no-padding`]: props.noPadding,
          }"
          @pointerdown="onPointerdown($event, true)"
          @pointerup="resetContentClickValue"
        >
          <img
            v-if="props.isRegistration"
            class="base-modal__content-bg"
            src="@/assets/img/modal-registration.webp"
            alt="user-bg"
          />

          <div class="base-modal__content-text">
            <slot
              :enable-overflow="enableOverflow"
              :disable-overflow="disableOverflow"
              name="content"
            >
              <div class="base-modal__content-inner">
                <slot name="content-inner" />
              </div>
            </slot>
          </div>

          <div v-if="$slots.footer" class="base-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </dialog>
    </div>
  </Component>
</template>

<style lang="scss" scoped>
@import 'ModalWindow';
</style>
