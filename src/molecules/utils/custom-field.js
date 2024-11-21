import { computed, ref, toRef } from 'vue'
import { useField } from 'vee-validate'

export function useCustomField(options) {
  if (options.name !== null) {
    const nameRef = computed(() => options.name ?? '')
    const keepValueOnUnmount = computed(
      () => options.keepValueOnUnmount ?? false
    )
    return useField(nameRef, undefined, {
      syncVModel: false,
      keepValueOnUnmount,
    })
  }

  return {
    value: toRef(options, 'modelValue'),
    setValue: (value) => (options.modelValue = value),
    errorMessage: ref(undefined),
  }
}
