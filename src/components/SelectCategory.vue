<template>
  <v-select
    v-model="model"
    label="Categorias"
    :items="categories"
    :rules="props.rules"
    item-title="name"
    item-value="id"
    variant="outlined"
  ></v-select>
</template>

<script setup>
import { useCategoryService } from '@/services'
import useNotification from '@/composables/useNotification'

const categoryService = useCategoryService()
const notification = useNotification()

const props = defineProps({
  rules: {
    type: Array,
    default: () => [],
  },
})

const model = defineModel({ required: true })

const categories = ref([])

async function getCategories() {
  try {
    const data = await categoryService.getAll()

    categories.value = data
  } catch (error) {
    if (error.response) {
      notification.error(
        'Não foi possível buscar as categorias. Erro: ' + error?.response?.data?.detail ||
          error.message,
      )
    }
  }
}

onMounted(() => {
  getCategories()
})
</script>
