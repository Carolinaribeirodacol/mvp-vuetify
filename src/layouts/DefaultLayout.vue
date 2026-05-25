<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title>My App</v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-logout" @click="dialogLogout = true"></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="menu in items"
          :key="menu.name"
          :title="menu.title"
          :value="menu.name"
          :to="{ name: menu.name }"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 100dvh">
      <router-view />
    </v-main>

    <v-dialog v-model="dialogLogout" max-width="400">
      <v-card prepend-icon="mdi-logout" title="Deseja encerrar sua sessão?">
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="handleLogout"> Sim </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'

const drawer = ref(false)
const dialogLogout = ref(false)
const router = useRouter()

const items = [
  {
    title: 'Dashboard',
    name: 'home',
  },
  {
    title: 'Categorias',
    name: 'category',
  },
  {
    title: 'Produtos',
    name: 'product',
  },
]

function handleLogout() {
  localStorage.removeItem('token')

  router.clearRoutes()
  router.replace('/')
}
</script>
