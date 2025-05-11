<template>
  <div>
    <h2>Users</h2>
    {{ userInfo }}

    <v-btn @click="logout()">Log out</v-btn>
    <!-- <div v-for="user in users.data" :key="user.id">
      {{ user.username }} (ID: {{ user.id }})
      <v-btn @click="updateUser(user.id)">✏️ Update</v-btn>
      <button @click="deleteUser(user.id)">🗑️ Delete</button>
    </div>

    <h2>Add User</h2>
    <input v-model="newUser.name" placeholder="Name" />

    <button @click="addUser">➕ Add</button> -->
  </div>
</template>

<script setup>
import { useStorage } from "@vueuse/core"
const userInfo = useStorage("userInfo")
const token = useStorage("token")
const logout = () => {
  token.value = null
  navigateTo("/login")
}
// const { data: users, error, refresh } = await useFetch("/api/user") // NOTE: route is /api/users not /api/user

// if (error.value) {
//   console.error("Error fetching users:", error.value)
// }

// const newUser = ref({
//   name: "",
// })

// const addUser = async () => {
//   await useFetch("/api/user", {
//     method: "POST",
//     body: newUser.value,
//   })
//   refresh() // Re-fetch updated list
// }

// const updateUser = async (id) => {
//   const updatedData = {
//     id,
//     name: prompt("Enter new name"),
//   }

//   await useFetch("/api/user", {
//     method: "PUT",
//     body: updatedData,
//   })
//   refresh()
// }

// const deleteUser = async (id) => {
//   await useFetch("/api/user", {
//     method: "DELETE",
//     body: { id },
//   })
//   refresh()
// }
</script>

<style lang="scss" scoped></style>
