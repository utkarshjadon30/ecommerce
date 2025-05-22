<template>
  <v-app-bar color="teal-darken-4">
    <template v-slot:prepend v-if="store.userRole === 'ADMIN'">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title
      >Hello, {{ parsedUserInfo.firstName }} {{ parsedUserInfo.lastName }}
    </v-app-bar-title>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-cart</v-icon>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="i"
          @click="handleMenuItemClick(item.title)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary width="300">
    <v-list>
      <v-list-item>
        <v-list-item-title class="text-h6">
          <v-btn @click="addCategory()">Add Category</v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useStorage } from "@vueuse/core"
const userInfo = useStorage("userInfo")
const parsedUserInfo = JSON.parse(userInfo.value)
const token = useStorage("token")
const drawer = ref(false)
const store = useEcommerce()

const addCategory = () => {
  store.categoryMode = "add"
  store.categoryDialog = true
  store.categoryName = ""
  store.categoryId = ""
}
const logout = () => {
  // console.log("logout")
  token.value = null
  navigateTo("/login")
}
const items = [{ title: "Logout" }]

const handleMenuItemClick = (title) => {
  if (title === "Logout") logout()
}
</script>

<style lang="scss" scoped></style>
