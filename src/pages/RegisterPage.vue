<template>
  <v-container class="pa-sm-4 pa-md-0 h-100" fluid>
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
        <div class="text-center">
          <v-img
            class="mx-auto mb-4"
            max-width="300"
            src="/assets/images/register-icon.svg"
            cover
          ></v-img>

          <h1 class="text-primary mb-2">Bem vindo</h1>

          <p class="text-gray-darken-1">Sua plataforma de gerenciamento de estoque</p>
        </div>
      </v-col>

      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px">
          <v-form v-model="valid" @submit.prevent="handleSubmit" class="d-flex flex-column ga-3">
            <div class="text-center mb-6">
              <h1 class="text-primary">Cadastre-se</h1>

              <p class="text-gray-darken-1">Fácil, rápido e gratuito!</p>
            </div>

            <v-text-field
              v-model="formData.name"
              label="Nome"
              :rules="[rules.required, rules.counter]"
              maxlength="20"
              variant="outlined"
              type="text"
              color="primary"
            ></v-text-field>

            <v-text-field
              v-model="formData.email"
              label="E-mail"
              :rules="[rules.required, rules.email]"
              variant="outlined"
              type="email"
              color="primary"
            ></v-text-field>

            <v-text-field
              v-model="formData.password"
              :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              label="Senha"
              :rules="[rules.required, rules.maxlength, rules.minLength, rules.password]"
              variant="outlined"
              :type="passwordVisible ? 'text' : 'password'"
              color="primary"
              @click:append-inner="showPassword"
            ></v-text-field>

            <v-btn :disabled="!valid" class="mb-3" block color="primary" type="submit" size="large">
              Cadastrar
            </v-btn>

            <div class="text-center mb-3">ou</div>

            <v-btn :to="{ name: 'login' }" block color="primary" variant="outlined" size="large"
              >Voltar</v-btn
            >
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useNotification from '@/composables/useNotification'
import { useApi } from '@/composables/useApi'

const api = useApi()
const notification = useNotification()
const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: '',
})

const valid = ref(false)
const passwordVisible = ref(false)

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
  maxlength: (value) => value.length <= 12 || 'Max 20 characters',
  minLength: (value) => value.length >= 6 || 'Min 6 characters',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido'
  },
  password: (value) => {
    if (!value) return true

    const hasLowerCase = /[a-z]/.test(value)
    const hasUpperCase = /[A-Z]/.test(value)
    const hasNumber = /[0-9]/.test(value)

    if (!hasLowerCase) return 'A senha deve conter pelo menos uma letra minúscula'
    if (!hasUpperCase) return 'A senha deve conter pelo menos uma letra maiúscula'
    if (!hasNumber) return 'A senha deve conter pelo menos um número'

    return true
  },
}

function handleSubmit() {
  if (!valid.value) {
    alert('Formulário inválido!')
  }

  createUser()
}

function showPassword() {
  passwordVisible.value = !passwordVisible.value
}

async function createUser() {
  try {
    await api.post('/user', {
      ...formData.value,
    })

    notification.success('Cadastro realizado com sucesso! Faça seu login.')

    router.push({ name: 'login' })
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
