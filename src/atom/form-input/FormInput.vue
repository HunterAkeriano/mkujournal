<script setup>
import { ref, defineProps, defineEmits } from 'vue'

// Получаем проп для значения и событие для обновления
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const focusInput = ref(false)

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

function checkValue() {
  if (props.modelValue.length) return
  focusInput.value = false
}
</script>

<template>
  <div class="form-input">
    <span
      :class="{ 'form-input__placeholder_focus': focusInput }"
      class="form-input__placeholder"
    >
      {{ props.placeholder }}
    </span>

    <input
      class="form-input__input"
      type="text"
      :value="props.modelValue"
      @input="onInput"
      @focus="focusInput = true"
      @blur="checkValue"
    />
    <span class="form-input__required">*</span>
  </div>
</template>

<style lang="scss" scoped>
@import 'FormInput';
</style>
