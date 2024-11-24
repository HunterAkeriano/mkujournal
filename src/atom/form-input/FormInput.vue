<script setup>
import { computed, onMounted, ref } from 'vue'
import { AsYouType } from 'libphonenumber-js/max'
import { useCustomField } from '@/molecules/utils/custom-field.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  isPhone: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: null,
  },
  customField: {
    type: Function,
    default: undefined,
  },
})

const emit = defineEmits(['update:modelValue'])

const focusInput = ref(false)

let value
let errorMessage

if (!props.customField) {
  const { value: valueCustom, errorMessage: errorMessageCustom } =
    useCustomField(props)

  value = valueCustom
  errorMessage = errorMessageCustom
} else {
  const { value: valueCustom, errorMessage: errorMessageCustom } =
    props.customField(props)

  value = valueCustom
  errorMessage = errorMessageCustom
}

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

function checkValue() {
  if (props.isPhone && inputValue.value === '+') {
    inputValue.value = ''
    focusInput.value = false
    return
  }

  if (inputValue.value?.length) return
  focusInput.value = false
}

function focusedInput() {
  focusInput.value = true
  if (props.isPhone && !inputValue.value) {
    inputValue.value = '+'
  }
}

function onInput(event) {
  const input = event.target

  if (props.isPhone) {
    if (input.value.startsWith('+') && input.value.indexOf('+', 1) !== -1) {
      input.value = input.value.replace(/\+/g, '').replace(/^/, '+')
    } else if (!input.value.startsWith('+')) {
      inputValue.value = '+' + input.value
      return
    }

    inputValue.value = new AsYouType().input(input.value)
    return
  }

  inputValue.value = input.value
}

onMounted(() => {
  if (
    props.isPhone &&
    inputValue.value &&
    typeof inputValue.value === 'string'
  ) {
    inputValue.value = new AsYouType().input(inputValue.value)
  }
})
</script>

<template>
  <div :class="{ 'form-input_error': errorMessage }" class="form-input">
    <span
      :class="{ 'form-input__placeholder_focus': focusInput }"
      class="form-input__placeholder"
    >
      {{ props.placeholder }}
    </span>

    <input
      :type="props.type"
      :value="inputValue"
      :class="{ [`form-input__input_${props.type}`]: true }"
      class="form-input__input"
      @input="onInput"
      @focus="focusedInput"
      @blur="checkValue"
    />

    <span class="form-input__required">*</span>

    <div class="form-input__error" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'FormInput';
</style>
