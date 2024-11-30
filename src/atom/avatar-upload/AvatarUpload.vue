<script setup>
import { useVModel } from '@vueuse/core'
import { ref, computed } from 'vue'
import UploadFile from '@/atom/upload-file/UploadFile.vue'
import BaseButtonText from '@/molecules/base-button-text/BaseButtonText.vue'

const props = defineProps({
  preloadedFile: {
    type: String,
    default: null,
  },
  localFile: {
    type: File,
    default: null,
  },
  disabled: {
    type: Boolean,
  },
  avatarErrorText: {
    type: String,
  },
})

const emit = defineEmits(['update:preloadedFile', 'update:localFile'])

const preloadedFile = useVModel(props, 'preloadedFile', emit)
const localFile = useVModel(props, 'localFile', emit)

const inputError = ref(undefined)
const inputWarn = ref(undefined)

const avatarError = computed(() => props.avatarErrorText || inputError.value)

function handleSizeError() {
  inputError.value = 'Перевищення розміру файлу'
  inputWarn.value = undefined
}

function handleTypeError() {
  inputError.value = 'Помилка типу файла'
  inputWarn.value = undefined
}

function handleTypeWarn(value) {
  if (value) {
    inputWarn.value = 'Невідома помилка'
    return
  }
  inputWarn.value = undefined
}

function handleErrors() {
  inputError.value = undefined
}
</script>

<template>
  <div class="avatar-upload">
    <UploadFile
      v-model:preloaded-file="preloadedFile"
      v-model:local-file="localFile"
      :disabled="props.disabled"
      :max-size="5"
      accept=".png, .jpeg, .jpg, .heic"
      @size-error="handleSizeError"
      @type-error="handleTypeError"
      @type-warn="handleTypeWarn"
      @update:local-file="handleErrors"
    />

    <div class="avatar-upload__params">
      Фотографія користувача

      <div v-if="avatarError">
        <BaseButtonText
          :clickable="false"
          variant="danger"
          icon="icon-exclamation-circle"
          size="sm"
          class="avatar-upload__params-error"
        >
          {{ inputError }}
        </BaseButtonText>
      </div>

      <div v-else-if="inputWarn">
        <BaseButtonText
          :clickable="false"
          variant="warning"
          icon="icon-exclamation-circle"
          size="sm"
          class="avatar-upload__params-error"
        >
          {{ inputWarn }}
        </BaseButtonText>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'AvatarUpload';
</style>
