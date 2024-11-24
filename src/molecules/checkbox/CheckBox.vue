<script setup>
import { computed, ref } from 'vue'
import { useCustomField } from '@/molecules/utils/custom-field.js'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)
const { value, errorMessage } = useCustomField(props)

const inputValue = computed({
  get() {
    if (props.name) {
      return value.value
    }

    return props.modelValue
  },
  set(next) {
    if (props.name) {
      value.value = next
    }

    emit('update:modelValue', next)
  },
})

function onBlur(event) {
  emit('blur', event)
}
</script>

<template>
  <div :class="{ checkbox_checked: inputValue }" class="checkbox">
    <Component :is="'label'" class="checkbox__container">
      <input
        ref="inputRef"
        v-model="inputValue"
        :disabled="props.disabled"
        type="checkbox"
        class="checkbox__input"
        @blur="onBlur"
      />

      <div class="checkbox__box">
        <img
          class="checkbox__checkmark"
          src="@/assets/img/checkbox/checkmark.svg"
          alt="checkmark"
        />
      </div>

      <div v-if="$slots.default" class="checkbox__content">
        <slot name="default" />
      </div>
    </Component>
  </div>
</template>

<style scoped lang="scss">
@import 'Checkbox';
</style>
