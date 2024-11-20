import { onMounted, watch } from 'vue'

const LOADER_ROOT_MARGIN = '200px'
const LOADER_THRESHOLD = 0

export function useLoader(options) {
  let intersectionObserver

  function initLoader() {
    onMounted(() => {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            return
          }

          options.emit('load-more')
        },
        {
          root: options.optionsContainerRef.value || document.body,
          threshold: LOADER_THRESHOLD,
          rootMargin: LOADER_ROOT_MARGIN,
        }
      )

      watch(() => options.props.loader, tryEnableItemsLoader)
      watch(() => options.props.loading, tryEnableItemsLoader, {
        immediate: true,
      })
    })
  }

  function tryEnableItemsLoader() {
    intersectionObserver.disconnect()

    if (!options.props.loader) {
      return
    }

    if (options.props.loading) {
      return
    }

    if (!options.optionsContainerRef.value || !options.optionsLoaderRef.value) {
      return
    }

    intersectionObserver.observe(options.optionsLoaderRef.value)
  }

  return { initLoader }
}
