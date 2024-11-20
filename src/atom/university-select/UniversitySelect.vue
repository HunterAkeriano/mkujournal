<script setup>
import FormSelect from '@/atom/form-select/FormSelect.vue'
import { universityArray } from '@/mixins/university.js'
</script>

<template>
  <FormSelect
    :options="universityArray"
    :get-option-label="(item) => item.name"
    placeholder="Факультет"
  />
</template>

<style scoped lang="scss"></style>
