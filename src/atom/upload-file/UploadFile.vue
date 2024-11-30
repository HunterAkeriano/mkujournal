<script setup>
import { useVModel } from '@vueuse/core'
import { computed, ref } from 'vue'
import FileInput from '@/molecules/file-input/FileInput.vue'
import BaseIcon from '@/molecules/base-icon/BaseIcon.vue'

const props = defineProps({
  preloadedFile: String,
  localFile: File,
  disabled: Boolean,
  accept: String,
  maxSize: Number,
  isMessageUpload: Boolean,
})

const emit = defineEmits([
  'update:preloadedFile',
  'update:localFile',
  'type-error',
  'size-error',
  'type-error',
  'type-warn',
])

const preloadedFile = useVModel(props, 'preloadedFile', emit)
const localFile = useVModel(props, 'localFile', emit)

const clearInput = ref(false)

const preview = computed(() => {
  if (localFile.value) {
    if (localFile.value.name.toLowerCase().endsWith('.heic')) {
      emit('type-warn', true)
      return ''
    }
    return URL.createObjectURL(localFile.value)
  }

  return preloadedFile.value || ''
})

function handleSizeError() {
  emit('size-error')
}

function handleTypeError() {
  emit('type-error')
}

function clearAvatar() {
  clearInput.value = true
  emit('update:localFile', null)
  emit('update:preloadedFile', null)
  emit('type-warn', false)
}
</script>

<template>
  <FileInput
    v-model:file="localFile"
    v-model:clear-input="clearInput"
    :disabled="props.disabled"
    :accept="props.accept"
    :max-size="props.maxSize"
    class="upload-file"
    @size-error="handleSizeError"
    @type-error="handleTypeError"
  >
    <template #default>
      <div v-if="!isMessageUpload" class="upload-file__container">
        <img v-if="preview" :src="preview" alt="preview" />

        <BaseIcon
          v-else
          icon="icon-photo-plus"
          class="upload-file__preview-plug"
        />

        <BaseIcon
          v-if="(preview || localFile?.name) && !props.disabled"
          icon="icon-x"
          class="upload-file__clear"
          @click.prevent.stop="clearAvatar"
        />
      </div>

      <slot v-else />
    </template>
  </FileInput>
</template>

<style lang="scss" scoped>
@import 'UploadFile';
</style>
