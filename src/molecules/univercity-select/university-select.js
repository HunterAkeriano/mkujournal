import { reactive, ref } from 'vue'
import { facultetSelect } from '@/atom/axios/facultet.js'

export function getSelectUniversity() {
  const isLoading = ref(true)
  const items = ref([])

  async function searchItems(search) {
    await fetchItems(search)
  }

  async function fetchItems(search) {
    isLoading.value = true
    try {
      const result = await facultetSelect(search)

      items.value = result.items
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }

  return reactive({
    isLoading,
    items,
    searchItems,
    fetchItems,
  })
}
