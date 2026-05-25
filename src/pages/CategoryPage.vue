<template>
  <default-container>
    {{ auth.getUserId() }}
    <div class="d-flex justify-space-between mb-6">
      <h1>Categorias</h1>

      <v-btn :to="{ name: 'form-category' }" append-icon="$plus" color="primary"> Nova </v-btn>
    </div>

    <v-data-table :items="categories" :headers :loading>
      <template v-slot:item.status="{ item }">
        <ChipStatus :status="item.status">
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn @click="editCategory(item.id)" size="small" color="primary"> Editar </v-btn>
      </template>
    </v-data-table>
  </default-container>
</template>

<script setup lang="ts">
import ChipStatus from '@/components/ChipStatus.vue'
import { useAuth } from '@/composables/useAuth'
import useNotification from '@/composables/useNotification'
import { useCategoryService } from '@/services'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const notification = useNotification()
const router = useRouter()
const categoryService = useCategoryService()
const loading = ref(false)

const auth = useAuth()

const categories = ref([])
const headers = [
  {
    title: 'ID',
    value: 'id',
  },
  {
    title: 'Name',
    value: 'name',
  },
  {
    title: 'Status',
    value: 'status',
  },
  {
    title: 'Ações',
    value: 'actions',
  },
]

async function getCategories() {
  loading.value = true

  try {
    categories.value = await categoryService.getAll()
  } catch (error) {
    notification.error(
      'Não foi possível buscar as categorias. Erro: ' + error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getCategories()
})

function editCategory(id) {
  router.push({ name: 'form-category', params: { id } })
}
</script>
