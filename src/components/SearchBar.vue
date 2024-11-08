<template>
  <div class="input-group mt-3">
    <input v-model="query" placeholder="Search..." class="form-control" />
    <button @click="filterRecipes" class="btn btn-primary">Search</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRecipeStore } from "@/store/recipeStore";

const store = useRecipeStore();
const query = ref("");

const filterRecipes = () => {
  console.log("Search query:", query.value);
  store.filterRecipes(query.value);
};
</script>

<style scope>
.btn-primary {
  background-color: #483e3e !important;
  border-color: #483e3e !important;
}

.btn-primary:hover {
  background-color: #707772 !important;
  border-color: #707772 !important;
}
</style>
