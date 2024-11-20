<script setup>
import Popper from 'vue3-popper'
import { computed, ref, watch } from 'vue'
import { debounce } from '@/molecules/utils/debounce.js'

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
})

const search = ref('')
const inputRef = ref(null)

const emit = defineEmits(['update:modelValue', 'search', 'change'])

const isSearchVisible = computed(() => {
  return !hasSelected.value || showOptions.value
})
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(next) {
    emit('update:modelValue', next)
  },
})

const searchOptions = debounce((values) => {
  emit('search', values)
})

const showOptions = ref(false)
const daun = [1, 2, 3, 4, 5, 7]

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

const selectedOptionPreview = computed(() => {
  const [option] = selectedOptions.value
  return option
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
</script>

<template>
  <div class="form-select">
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
      </div>

      <template #content>
        <div class="form-select__dropdown" @pointerdown.prevent.stop>
          <div
            class="form-select__option"
            v-for="option in props.options"
            @click="onOptionClick(option)"
          >
            {{ getReducedOptionByProps(option) }}
          </div>
        </div>
      </template>
    </Popper>
  </div>
</template>

<style lang="scss">
@import 'FormSelect';
</style>
