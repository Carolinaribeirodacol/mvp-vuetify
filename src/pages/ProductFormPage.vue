<template>
  <default-container>
    <div class="d-flex justify-space-between mb-6">
      <h2>Cadastro de produtos</h2>
    </div>

    <v-form v-model="valid" @submit.prevent="handleSubmit" class="d-flex flex-column ga-3">
      <v-text-field
        v-model="formProduct.name"
        label="Nome"
        :rules="[rules.required]"
        maxlength="20"
        variant="outlined"
        type="text"
        color="primary"
      ></v-text-field>

      <v-textarea
        v-model="formProduct.description"
        label="Descrição"
        :rules="[rules.required]"
        class="mb-4"
        type="text"
        variant="outlined"
        required
      >
      </v-textarea>

      <v-select
        v-model="formProduct.status"
        label="Status"
        :items
        :rules="[rules.required]"
        item-title="name"
        item-value="value"
        variant="outlined"
      ></v-select>

      <v-text-field
        v-model="formProduct.price"
        :rules="[rules.required]"
        label="Preço"
        variant="outlined"
        type="number"
        color="primary"
      ></v-text-field>

      <select-category v-model="formProduct.category_id" :rules="[rules.required]" />

      <div class="d-flex justify-end ga-3">
        <v-btn color="secondary" :to="{ name: 'product' }" size="large"> voltar </v-btn>

        <v-btn :disabled="!valid" color="primary" type="submit" size="large">
          {{ idProduct ? 'Atualizar' : 'Cadastrar' }}
        </v-btn>
      </div>
    </v-form>
  </default-container>
</template>

<script setup>
import useNotification from '@/composables/useNotification'
import { useProductService } from '@/services/api/product.service'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
const idProduct = ref('')

const router = useRouter()
const route = useRoute()

const valid = ref(false)
const formProduct = ref({
  name: '',
  description: '',
  price: 0,
  status: 'active',
  category_id: null,
})

const notification = useNotification()
const productService = useProductService()

const items = [
  {
    name: 'Ativo',
    value: 'active',
  },
  {
    name: 'Inativo',
    value: 'inactive',
  },
]

function handleSubmit() {
  if (!valid.value) {
    notification.error('Formulário inválido!')
  }

  idProduct.value ? updateProduct(idProduct.value) : createProduct()
}

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
}

onMounted(() => {
  if (route.params?.id) {
    idProduct.value = route.params?.id
    getProduct(route.params.id)
  }
})

async function createProduct() {
  try {
    await productService.create(formProduct.value)

    notification.success('Produto cadastrado com sucesso!')

    router.push({ name: 'product' })
  } catch (error) {
    if (error.response) {
      notification.error(
        'Não foi possível realizar o cadastro. Erro: ' + error?.response?.data?.detail ||
          error.message,
      )
    }
  }
}

async function getProduct(id) {
  try {
    const data = await productService.getById(id)

    formProduct.value = {
      name: data.name,
      status: data.status,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
    }
  } catch (error) {
    if (error.response) {
      notification.error(
        'Não foi possível buscar o produto. Erro: ' + error?.response?.data?.detail ||
          error.message,
      )
    }
  }
}

async function updateProduct(id) {
  try {
    await productService.update(id, formProduct.value)

    notification.success('Produto atualizada com sucesso!')

    router.push({ name: 'product' })
  } catch (error) {
    if (error.response) {
      notification.error(
        'Não foi possível realizar o cadastro. Erro: ' + error?.response?.data?.detail ||
          error.message,
      )
    }
  }
}
</script>
