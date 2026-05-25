<template>
  <default-container>
    <div class="d-flex justify-space-between mb-6">
      <h2>Cadastro de categoria</h2>
    </div>

    <v-form v-model="valid" @submit.prevent="handleSubmit" class="d-flex flex-column ga-3">
      <v-text-field
        v-model="formCategory.name"
        label="Nome"
        :rules="[rules.required]"
        maxlength="20"
        variant="outlined"
        type="text"
        color="primary"
      ></v-text-field>

      <v-select
        v-model="formCategory.status"
        label="Status"
        :items
        :rules="[rules.required]"
        item-title="name"
        item-value="value"
        variant="outlined"
      ></v-select>

      <div class="d-flex justify-end ga-3">
        <v-btn color="secondary" :to="{ name: 'category' }" size="large"> voltar </v-btn>

        <v-btn :disabled="!valid" color="primary" type="submit" size="large">
          {{ idCategory ? 'Atualizar' : 'Cadastrar' }}
        </v-btn>
      </div>
    </v-form>
  </default-container>
</template>

<script setup>
import useNotification from '@/composables/useNotification'
import { useCategoryService } from '@/services'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
const idCategory = ref('')

const router = useRouter()
const route = useRoute()

const categoryService = useCategoryService()

const valid = ref(false)
const formCategory = ref({
  name: '',
  status: 'active',
})
const notification = useNotification()
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

  idCategory.value ? updateCategory(idCategory.value) : createCategory()
}

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
}

onMounted(() => {
  if (route.params?.id) {
    idCategory.value = route.params?.id
    getCategory(route.params.id)
  }
})

async function createCategory() {
  try {
    await categoryService.create(formCategory.value)

    notification.success('Categoria cadastrada com sucesso!')

    router.push({ name: 'category' })
  } catch (error) {
    if (error.response) {
      notification.error(
        'Não foi possível realizar o cadastro. Erro: ' + error?.response?.data?.detail ||
          error.message,
      )
    }
  }
}

async function getCategory(id) {
  try {
    const data = await categoryService.getById(id)

    formCategory.value = {
      name: data.name,
      status: data.status,
    }
  } catch (error) {
    if (error.response) {
      notification.error(
        'Não foi possível buscar a categoria. Erro: ' + error?.response?.data?.detail ||
          error.message,
      )
    }
  }
}

async function updateCategory(id) {
  try {
    await categoryService.update(id, formCategory.value)

    notification.success('Categoria atualizada com sucesso!')

    router.push({ name: 'category' })
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
