<script setup lang="ts">


const model = defineModel()

const props = defineProps<{
  type: string
}>()


</script>

<template>
  <input :type="props.type" v-model="model"/>

</template>

<style scoped>

</style>