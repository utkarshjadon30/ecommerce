<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <CategoryList />
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar v-model="store.snackbar">
    {{ store.snackbarMessage }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="store.snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
const store = useEcommerce()
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
