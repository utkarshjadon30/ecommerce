<template>
  <h2>Categories</h2>

  <v-chip-group
    selected-class="text-primary"
    multiple
    v-model="selectedCategories"
  >
    <v-chip
      v-for="tag in tags"
      :key="tag.id"
      :value="tag.id"
      :closable="store.userRole === 'ADMIN'"
      @click:close="deleteCategory(tag)"
      class="d-flex align-center"
    >
      <v-icon
        v-if="store.userRole === 'ADMIN'"
        icon="mdi-pencil"
        size="18"
        class="me-2"
        @click.stop="editCategory(tag)"
      />
      {{ tag.name }}
    </v-chip>
  </v-chip-group>

  <v-dialog width="77vw" v-model="store.categoryDialog" persistent>
    <CategoryForm />
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"

const store = useEcommerce()

const selectedCategories = ref([])
const tags = computed(() => store.categoryList)

onMounted(() => {
  store.getCategoryList()
})

// Edit handler
function editCategory(tag) {
  store.categoryDialog = true
  store.categoryMode = "edit"
  store.categoryName = tag.name
  store.categoryId = tag.categoryId
}

// Delete handler
function deleteCategory(tag) {
  store.categoryId = tag.categoryId
  store.deleteCategory(store.categoryId)
}
</script>

<style scoped>
.v-chip {
  cursor: default;
}
</style>
