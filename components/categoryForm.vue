<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col cols="auto" v-if="store.categoryMode === 'add'">
          Add Category
        </v-col>
        <v-col cols="auto" v-if="store.categoryMode === 'edit'">
          Edit Category
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn
            variant="plain"
            icon="mdi-close"
            @click="store.categoryDialog = false"
          ></v-btn>
        </v-col> </v-row
    ></v-card-title>
    <v-card-text>
      <v-text-field
        v-model="store.categoryName"
        placeholder="Name"
        variant="outlined"
      >
      </v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn v-if="store.categoryMode === 'add'" block @click="saveCategory()"
        >Save</v-btn
      >
      <v-btn v-if="store.categoryMode === 'edit'" block @click="editCategory()"
        >Edit</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
const store = useEcommerce()

const saveCategory = () => {
  store.addCategory(store.categoryName)
  store.categoryDialog = false
}

const editCategory = () => {
  store.editCategory(store.categoryId, store.categoryName)
  store.categoryDialog = false
}
</script>

<style lang="scss" scoped></style>
