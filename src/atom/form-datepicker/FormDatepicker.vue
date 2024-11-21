<script setup>
import { useScreens } from 'vue-screen-utils'
import { DatePicker } from 'v-calendar'
import { computed, ref } from 'vue'
import { useCustomField } from '@/molecules/utils/custom-field.js'

const props = defineProps({
  modelValue: {
    type: [Date, String],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  columns: {
    type: Object,
  },
  minDate: {
    type: Date,
    default: undefined,
  },
  maxDate: {
    type: Date,
    default: undefined,
  },
  variant: {
    type: String,
  },
  isDatepicker: {
    type: Boolean,
  },
  isRange: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  mode: {
    type: String,
    default: 'datetime',
  },
  customField: {
    type: Function,
    default: undefined,
  },
  name: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])
const datePicker = ref(null)

const popoverOpened = ref(false)
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

const { mapCurrent } = useScreens({
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1280px',
})
const getColumns = computed(
  () =>
    props.columns || {
      default: 1,
    }
)
const columns = mapCurrent(getColumns.value)

function onPopoverHide() {
  popoverOpened.value = false
}

async function onPopoverShow() {
  popoverOpened.value = true
}

function onDayClick(_, event) {
  const target = event.target
  target.blur()
}

function formatDate(date) {
  if (!(date instanceof Date) || isNaN(date)) return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear() // год

  return `${day}.${month}.${year}`
}

const formattedDate = computed(() => {
  if (inputValue.value) {
    return formatDate(inputValue.value)
  }
  return ''
})
</script>

<template>
  <DatePicker
    v-bind="$attrs"
    @dayclick="onDayClick"
    v-model="inputValue"
    :mode="props.mode"
    :disabled="props.disabled"
    :columns="columns"
    :is-range="props.isRange"
    :min-date="minDate"
    :max-date="maxDate"
    ref="datePicker"
    class="form-datepicker__component"
    color="pink"
    locale="uk"
    is24hr
    @popover-will-hide="onPopoverHide"
    @popover-will-show="onPopoverShow"
  >
    <template v-if="props.isDatepicker" #default="{ togglePopover }">
      <div
        class="form-datepicker__field-content"
        @click.prevent="togglePopover"
      >
        <input
          :value="formattedDate"
          :placeholder="props.placeholder"
          :readonly="true"
          :class="{
            [`form-datepicker__field-input_${props.variant}`]: true,
          }"
          class="form-datepicker__field-input"
        />

        <span class="form-datepicker__field-required">*</span>

        <div class="form-datepicker__error" v-if="errorMessage">
          {{ errorMessage }}
        </div>
      </div>
    </template>
  </DatePicker>
</template>

<style lang="scss">
@import 'v-calendar/dist/style.css';
</style>

<style lang="scss">
@import 'FormDatePicker';
</style>
