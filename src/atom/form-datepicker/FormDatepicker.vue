<script setup>
import { useScreens } from 'vue-screen-utils'
import { DatePicker } from 'v-calendar'
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date,
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
})

const emit = defineEmits(['update:modelValue'])
const datePicker = ref(null)

const popoverOpened = ref(false)
const focusInput = ref(false)

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(next) {
    emit('update:modelValue', next)
  },
})

// const textContent = computed(() => {
//   if (!inputValue.value) {
//     return null
//   }
//
//   const format = `${props.mode}-short`
//
//   if (inputValue.value instanceof Date) {
//     return d(inputValue.value, format)
//   }
//
//   const start = d(inputValue.value.start, format)
//   const end = d(inputValue.value.end, format)
//   return `${start} - ${end}`
// })

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

// const hasSelected = computed(() => {
//   return inputValue.value !== null && inputValue.value !== undefined
// })

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
      </div>
    </template>
  </DatePicker>
</template>

<style lang="scss">
@import 'v-calendar/dist/style.css';
</style>

<style scoped lang="scss">
@import 'FormDatePicker';
</style>
