<script setup>
import FormSelect from '@/atom/form-select/FormSelect.vue'
import { onMounted, ref } from 'vue'
import { getSelectUniversity } from '@/molecules/univercity-select/university-select.js'

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
})

const selectData = getSelectUniversity()

onMounted(async () => {
  await selectData.fetchItems()
})
</script>

<template>
  <FormSelect
    :options="selectData.items"
    :get-option-label="(item) => item.full_name"
    :name="props.name"
    :loader="selectData.isLoading"
    searchable
    placeholder="Факультет"
    @search="selectData.searchItems($event)"
  />
</template>

<style scoped lang="scss"></style>
