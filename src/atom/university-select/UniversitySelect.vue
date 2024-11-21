<script setup>
import FormSelect from '@/atom/form-select/FormSelect.vue'
import { universityArray } from '@/mixins/university.js'
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
})

const filteredUniversities = ref(universityArray)

function search(query) {
  if (!query) {
    filteredUniversities.value = universityArray
    return
  }
  filteredUniversities.value = universityArray.filter((university) =>
    university.name.toLowerCase().includes(query.toLowerCase())
  )
}
</script>

<template>
  <FormSelect
    :options="filteredUniversities"
    :get-option-label="(item) => item.name"
    :name="props.name"
    searchable
    placeholder="Факультет"
    @search="search($event)"
  />
</template>

<style scoped lang="scss"></style>
