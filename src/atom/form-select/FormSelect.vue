<script setup>
import Popper from 'vue3-popper'
import { computed, ref, watch } from 'vue'
import { debounce } from '@/molecules/utils/debounce.js'
import { sortAndStringify } from '@/molecules/utils/sort-stringify.js'
import { useCustomField } from '@/molecules/utils/custom-field.js'
import { deepEqual } from '@/molecules/utils/deep-equal.js'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: '',
  },
  reduce: {
    type: Function,
    default: undefined,
  },
  searchable: {
    type: Boolean,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  options: {
    type: Array,
    default: undefined,
  },
  getOptionLabel: {
    type: Function,
    default: undefined,
  },
  loader: {
    type: Boolean,
    default: undefined,
  },
  name: {
    type: String,
    default: null,
  },
  customField: {
    type: Function,
    default: undefined,
  },
  getOptionKey: {
    type: Function,
    default: (option) => {
      if (option === null || option === undefined) {
        console.warn("Incorrect option, can't get key, ", option)
        return JSON.stringify(option)
      }
      if (typeof option === 'object') {
        return 'id' in option ? option.id : sortAndStringify(option)
      }
      return option
    },
  },
})

const search = ref('')
const inputRef = ref(null)

const emit = defineEmits(['update:modelValue', 'search', 'change'])

const isSearchVisible = computed(() => {
  return !hasSelected.value || showOptions.value
})
let value
let initialError
const errorMessage = ref(undefined)

if (!props.customField) {
  const { value: valueCustom, errorMessage: errorMessageCustom } =
    useCustomField(props)

  value = valueCustom
  initialError = errorMessageCustom
} else {
  const { value: valueCustom, errorMessage: errorMessageCustom } =
    props.customField(props)

  value = valueCustom
  initialError = errorMessageCustom
}

const inputValue = computed({
  get() {
    if (props.name) {
      return value.value
    }

    return props.modelValue
  },
  set(next) {
    if (deepEqual(value.value, next)) return
    if (props.name) {
      value.value = next
    }

    emit('update:modelValue', next)
  },
})

const searchOptions = debounce((values) => {
  emit('search', values)
})

const showOptions = ref(false)

watch(showOptions, () => {
  if (search.value === '') {
    return
  }

  if (showOptions.value) {
    return
  }

  search.value = ''
  searchOptions(search.value)
})

const selectedOptions = computed(() => {
  const values = Array.isArray(inputValue.value)
    ? inputValue.value
    : [inputValue.value]

  if (!props.reduce) {
    return values
  }
})

const hasSelected = computed(() => {
  if (Array.isArray(inputValue.value)) {
    return inputValue.value.length > 0
  }

  return (
    inputValue.value !== null &&
    inputValue.value !== undefined &&
    inputValue.value !== ''
  )
})

function getOptionLabelByProps(option) {
  if (props.getOptionLabel) {
    return props.getOptionLabel(option)
  }

  if (option !== null && typeof option === 'object') {
    return option[props.label || '']
  }

  return option
}

const selectedOptionPreview = computed(() => {
  const [option] = selectedOptions.value
  return getOptionLabelByProps(option)
})

function onFocus() {
  showOptions.value = true
}

async function onBlur() {
  showOptions.value = false
}

function getReducedOptionByProps(option) {
  if (props.reduce) {
    return props.reduce(option)
  }

  return option
}

function onOptionClick(option) {
  const reduced = getReducedOptionByProps(option)

  emit('change')

  inputValue.value = reduced
  blur()
}

function blur() {
  inputRef.value?.blur()
}

function checkAreOptionsEqual(a, b) {
  if (a === null || b === null || a === undefined || b === undefined) {
    return false
  }

  const aKey = props.getOptionKey(a)
  const bKey = props.getOptionKey(b)
  return aKey === bKey
}

function checkIsOptionSelected(option) {
  return selectedOptions.value.some((item) =>
    checkAreOptionsEqual(
      getReducedOptionByProps(item),
      getReducedOptionByProps(option)
    )
  )
}
</script>

<template>
  <div :class="{ 'form-select_opened': showOptions }" class="form-select">
    <Popper
      :show="showOptions"
      offset-distance="5"
      placement="bottom-start"
      class="form-select__popover"
    >
      <div class="form-select__wrapper">
        <div class="form-select__content">
          <input
            :readonly="!props.searchable"
            :placeholder="props.placeholder"
            :class="{
              'form-select__search_visible': isSearchVisible,
            }"
            ref="inputRef"
            v-model="search"
            class="form-select__search"
            type="text"
            @focus="onFocus"
            @blur="onBlur"
            @input="searchOptions($event.target.value)"
          />

          <div class="form-select__arrow">
            <BaseIcon icon="icon-arrow" />
          </div>

          <div
            v-if="hasSelected && !showOptions"
            class="form-select__selected-option"
          >
            <slot name="selected-option" :option="inputValue">
              <div class="form-select__selected-option-inner">
                <slot name="selected-option-inner" :option="inputValue">
                  {{ selectedOptionPreview }}
                </slot>
              </div>
            </slot>
          </div>
        </div>

        <div class="form-select__actions"></div>
      </div>

      <template #content>
        <div class="form-select__dropdown" @pointerdown.prevent.stop>
          <div
            :class="{
              'form-select__option_selected': checkIsOptionSelected(option),
            }"
            class="form-select__option"
            v-for="option in props.options"
            @click="onOptionClick(option)"
          >
            {{ getOptionLabelByProps(option) }}
          </div>

          <div
            v-if="!props.loader && !options.length"
            class="form-select__not-item"
          >
            Елементів не знайдено
          </div>

          <div
            v-if="props.loader"
            ref="optionsLoaderRef"
            class="form-select__options-loader"
          >
            <BaseIcon
              icon="icon-loader-2"
              class="form-select__options-loader-icon"
            />
          </div>
        </div>
      </template>
    </Popper>

    <div class="form-select__error" v-if="initialError">
      {{ initialError }}
    </div>
  </div>
</template>

<style lang="scss">
@import 'FormSelect';
</style>
