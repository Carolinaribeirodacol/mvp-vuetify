<template>
  <default-container>
    <h1>Dashboard</h1>

    <v-row>
      <v-col cols="12" sm="4">
        <card-dashboard
          card-title="Categorias"
          :card-value="categoriesTotal"
          card-icon="shape-outline"
        />
      </v-col>

      <v-col cols="12" sm="4">
        <card-dashboard
          :card-title="'Produtos'"
          :card-value="productsTotal"
          card-icon="mdi-package-variant"
        />
      </v-col>
    </v-row>
  </default-container>
</template>

<script setup>
import CardDashboard from '@/components/CardDashboard.vue'
import { useCategoryService, useProductService } from '@/services'

const categoryService = useCategoryService()
const productService = useProductService()

const categoriesTotal = ref(0)
const productsTotal = ref(0)

async function getCategoriesTotal() {
  try {
    categoriesTotal.value = await categoryService.getTotal()
  } catch (error) {
    notification.error('Não foi possível buscar as categorias. Erro: ' + error)
  }
}

async function getProductsTotal() {
  try {
    productsTotal.value = await productService.getTotal()
  } catch (error) {
    notification.error('Não foi possível buscar as categorias. Erro: ' + error)
  }
}

onMounted(() => {
  getCategoriesTotal()
  getProductsTotal()
})
</script>
