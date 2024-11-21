import 'vue-toastification/dist/index.css'
import { useToast } from 'vue-toastification'

export const toastPlugin = {
  install(app, options) {
    app.use(options.plugin, options.options)
  },
}

const toaster = useToast()
export const filterBeforeCreate = (toast, toasts) => {
  const existingToasts = toasts.filter(
    (t) => t.type == toast.type && t.content == toast.content
  )

  if (existingToasts.length > 0) {
    const toastToUpdate = existingToasts[0]

    toaster.update(toastToUpdate.id || 0, {
      content: toast.content,
      options: { timeout: 5000 },
    })
    return false
  }

  return toast
}
