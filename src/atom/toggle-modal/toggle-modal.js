import { reactive } from 'vue'

export function useToggleModal() {
  const modal = reactive({
    item: false,
    open,
    close,
  })

  function open() {
    modal.item = true
  }

  function close() {
    modal.item = false
  }

  return modal
}

export function useToggleModalWithItem() {
  const modal = reactive({
    item: null,
    open,
    close,
  })

  function open(item) {
    modal.item = item
  }

  function close() {
    modal.item = null
  }

  return modal
}
