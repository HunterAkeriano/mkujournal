<script setup>
import BaseAccordion from '@/molecules/base-accordion/BaseAccordion.vue'
import accordion from '@/mixins/accordion.js'
import { ref } from 'vue'

const activeAccordion = ref(0)
</script>

<template>
  <div class="faq">
    <div class="faq__bg">
      <img src="@/assets/img/main/bg-pink.png" alt="bg-pink" />
    </div>

    <div class="container">
      <div class="faq__title">
        <h3>питання-відповідь</h3>
      </div>

      <div class="faq__content">
        <div class="faq__content-items">
          <BaseAccordion
            v-for="item in accordion"
            :key="item.id"
            :class="{ accordion_opened: activeAccordion === item.id }"
            @click="activeAccordion = item.id"
          >
            <template #title>
              <h5>{{ item.title }}</h5>
            </template>

            <template #content>
              <p v-if="!item.underLine">{{ item.content }}</p>

              <p v-if="item.underLine">{{ item.titleItem }}</p>

              <ol class="accordion__ol">
                <li v-for="el in item.underContent" :key="el.id">
                  {{ el.item }}
                </li>
              </ol>

              <p v-if="item.underContent">{{ item.footerTitle }}</p>
            </template>
          </BaseAccordion>
        </div>

        <div class="faq__content-student">
          <img src="@/assets/img/modal/modal-students.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'FAQ';
</style>
