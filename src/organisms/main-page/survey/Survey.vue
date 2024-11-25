<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { getBlock, updateTeacher } from '@/atom/axios/facultet.js'
import BaseCard from '@/atom/base-card/BaseCard.vue'
import CheckBox from '@/molecules/checkbox/CheckBox.vue'
import { array, boolean, date, number, object, string } from 'yup'
import { useForm } from 'vee-validate'
import BaseButton from '@/molecules/base-button/BaseButton.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/scss/pagination'
import { getErrorMessages } from '@/molecules/utils/fetch-error.js'
import { useToast } from 'vue-toastification'

const items = ref(null)
const isLoading = ref(false)
const toast = useToast()

const schema = object({
  items: array().of(arrayItems()),
})

function arrayItems() {
  return object({
    id: number().default(0),
    name: string(),
    teachers: array().of(teachersArray()),
  })
}

function teachersArray() {
  return object({
    id: number().default(0),
    voice: number().default(0),
    hasSelected: boolean().default(false),
  })
}

const form = useForm({
  validationSchema: schema,
  initialValues: schema.getDefault(),
})

const { values, setFieldValue } = form

async function loadItems() {
  isLoading.value = true

  try {
    items.value = await getBlock()
    setFieldValue('items', items.value)
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadItems)

async function submit() {
  isLoading.value = true

  try {
    const submitArray = values.items
      .map((item) =>
        item.teachers.filter((el) => el.hasSelected).map((el) => el.id)
      )
      .flat()

    const result = await updateTeacher(submitArray)

    if (result) {
      items.value.forEach((item, idx) => {
        item.teachers.forEach((el, index) => {
          if (values.items[idx].teachers[index].hasSelected) {
            el.voice += 1
          }
        })
      })

      toast.success(result.message)
    }
  } catch (error) {
    const messages = getErrorMessages(error)
    messages.forEach((item) => toast.error(item))
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="survey">
    <div class="container">
      <div class="survey__title">
        <h2>Пройдіть опитування</h2>
        <p>"Найкраший викладач МКУ Пилипа Орлика"</p>
      </div>

      <div class="survey__bg">
        <img src="@/assets/img/main/cards.png" alt="cards" />
      </div>

      <div class="survey__cards">
        <BaseCard v-for="(item, idx) in items" :key="idx" bg-color="pink-cards">
          <template #header>
            <h4 class="survey__cards-title">{{ item.name }}</h4>
          </template>

          <template #content>
            <ul class="survey__cards-content">
              <li v-for="(el, index) in item.teachers" :key="index">
                <CheckBox :name="`items.${idx}.teachers.${index}.hasSelected`">
                  {{ el.surName + ' ' + el.name + ' ' + el.lastName }}
                </CheckBox>

                <span>{{ el.voice }}</span>
              </li>
            </ul>
          </template>
        </BaseCard>
      </div>

      <div class="survey__swiper">
        <swiper :centered-slides="true" space-between="20" slides-per-view="1">
          <swiper-slide v-for="(item, idx) in items" :key="idx">
            <BaseCard bg-color="pink-cards">
              <template #header>
                <h4 class="survey__cards-title">{{ item.name }}</h4>
              </template>

              <template #content>
                <ul class="survey__cards-content">
                  <li v-for="(el, index) in item.teachers" :key="index">
                    <CheckBox
                      :name="`items.${idx}.teachers.${index}.hasSelected`"
                    >
                      {{ el.surName + ' ' + el.name + ' ' + el.lastName }}
                    </CheckBox>

                    <span>{{ el.voice }}</span>
                  </li>
                </ul>
              </template>
            </BaseCard>
          </swiper-slide>
        </swiper>
      </div>

      <div class="survey__btn">
        <BaseButton :loading="isLoading" clickable @click="submit">
          Надіслати Відповідь
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'Survey';
</style>
