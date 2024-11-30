<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  file: {
    type: File,
    default: null,
  },
  files: {
    type: Array,
    default: [],
  },
  multiple: {
    type: Boolean,
  },
  accept: {
    type: String,
  },
  maxSize: {
    type: Number,
    default: null,
  },
  disabled: {
    type: Boolean,
  },
  clearInput: {
    type: Boolean,
  },
})

const emit = defineEmits([
  'update:file',
  'update:files',
  'update:clearInput',
  'amount-error',
  'type-error',
  'size-error',
])

let idCounter = 0
let invalidAmount = false
let invalidType = false
let invalidSize = false

const fileForm = ref(null)
const fileInput = ref(null)

const fileData = computed({
  get() {
    return props.file
  },
  set(value) {
    emit('update:file', value)
  },
})
const filesData = computed({
  get() {
    return props.files
  },
  set(value) {
    emit('update:files', value)
  },
})

const acceptedTypes = computed(() => {
  const trimmed = props.accept.replaceAll(' ', '')
  return trimmed.length > 0 ? trimmed.split(',') : []
})

const maxSizeFormatted = computed(() => {
  if (!props.maxSize) {
    return null
  }

  return props.maxSize * 1024 * 1024
})

watch(
  () => props.clearInput,
  () => {
    if (props.clearInput) {
      fileForm.value?.reset()
      emit('update:clearInput', false)
    }
  }
)

function onInput() {
  if (!fileInput.value?.files || !fileInput.value.files.length) {
    return
  }

  const arr = getFilesArray(fileInput.value.files)
  const singleMultipleMaxCount =
    props.multiple && filesData.value.length === props.max && props.max === 1
  const selectedFilesCount = singleMultipleMaxCount ? 0 : filesData.value.length
  const availableFilesCount = (props.max || 0) - selectedFilesCount

  if (singleMultipleMaxCount) {
    filesData.value.splice(0, filesData.value.length)
  }

  if (arr.length > availableFilesCount) {
    invalidAmount = true
  }

  const files = props.max ? arr.slice(0, availableFilesCount) : arr

  if (props.multiple) {
    loadFiles(files)
    return
  }

  loadFile(files[0])
}

function getFilesArray(list) {
  const output = []
  for (let i = 0; i < list.length; i++) {
    const file = list[i]
    file.id = idCounter++

    output.push(file)
  }
  return output
}

function loadFiles(files) {
  const result = [...filesData.value]

  for (let i = 0; i < files.length; i++) {
    const valid = validateFile(files[i])
    if (!valid) {
      continue
    }

    result.push(files[i])
  }

  handleErrors()

  filesData.value = result
}

function loadFile(file) {
  const valid = validateFile(file)

  handleErrors()

  if (!valid) {
    return
  }

  fileData.value = file
}

function validateFile(file) {
  if (!validateFileType(file)) {
    invalidType = true
    handleErrors(file)
    return false
  } else if (!validateFileSize(file)) {
    invalidSize = true
    handleErrors(file)
    return false
  } else {
    return true
  }
}

function validateFileType(file) {
  if (acceptedTypes.value.length === 0) {
    return true
  }

  for (const type of acceptedTypes.value) {
    const dot = '.'
    if (type.includes(dot)) {
      const extension = `.${type.split(dot)[1].toLowerCase()}`
      const lastIndex = file.name.toLowerCase().lastIndexOf(extension)

      const isFound = lastIndex >= 0
      const isSameIndex = lastIndex === file.name.length - extension.length
      if (isFound && isSameIndex) {
        return true
      }
    }

    const slash = '/'
    if (type.includes(slash)) {
      const [ruleFormat, ruleType] = type.split('/')
      const [fileFormat, fileType] = file.type.split('/')

      const any = '*'

      const isFormatValid = ruleFormat === any || ruleFormat === fileFormat
      const isTypeValid = ruleType === any || ruleType === fileType

      if (isFormatValid && isTypeValid) {
        return true
      }
    }
  }

  return false
}

function validateFileSize(file) {
  return maxSizeFormatted.value === null || file.size <= maxSizeFormatted.value
}

function handleErrors(file) {
  if (invalidAmount) {
    emit('amount-error')
    invalidAmount = false
  }

  if (invalidType) {
    emit('type-error', file)
    invalidType = false
  }

  if (invalidSize) {
    emit('size-error', file)
    invalidSize = false
  }
}

function open() {
  if (!filesData.value.length) {
    fileForm.value?.reset()
  }
  fileInput.value?.click()
}
</script>

<template>
  <form ref="fileForm">
    <label :class="{ disabled: props.disabled }" class="file-input">
      <span class="file-input__container">
        <slot :trigger-input="open" />
      </span>

      <input
        ref="fileInput"
        :accept="accept"
        :multiple="multiple"
        type="file"
        class="file-input__input"
        @input="onInput"
      />
    </label>
  </form>
</template>

<style lang="scss" scoped>
@import 'FileInput';
</style>
