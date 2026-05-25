<template>
  <default-container>
    {{ auth.getUserId() }}
    <div class="d-flex justify-space-between mb-6">
      <h1>Produtos</h1>

      <v-btn :to="{ name: 'form-product' }" append-icon="$plus" color="primary"> Novo </v-btn>
    </div>

    <v-data-table :items="products" :headers>
      <template v-slot:item.status="{ item }">
        <ChipStatus :status="item.status">
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn @click="editProduct(item.id)" size="small" color="primary"> Editar </v-btn>
      </template>
    </v-data-table>
  </default-container>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import useNotification from '@/composables/useNotification'
import { useProductService } from '@/services/api/product.service'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const notification = useNotification()
const router = useRouter()
const productService = useProductService()

const auth = useAuth()

const products = ref([])
const loading = ref(false)

const headers = [
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

async function getProducts() {
  loading.value = true

  try {
    products.value = await productService.getAll()
  } catch (error) {
    notification.error('Não foi possível buscar as produtos. Erro: ' + error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getProducts()
})

function editProduct(id) {
  router.push({ name: 'form-product', params: { id } })
}
</script>
