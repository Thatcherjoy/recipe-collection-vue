<template>
  <div class="container mt-5">
    <button @click="goBack" class="btn btn-secondary back-button">Back</button>
    <div v-if="recipe" class="text-center">
      <img
        v-if="recipe.image && recipe.image.length > 0"
        :src="recipe.image[0]"
        alt="Recipe Image"
        class="fixed-size-image mb-4"
      />
      <h1>{{ recipe.name }}</h1>
      <p>By: {{ cleanedAuthorName }}</p>
      <div class="mt-4">
        <h3>Ingredients</h3>
        <ul class="list-unstyled">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <div class="mt-4">
        <h3>Instructions</h3>
        <ul class="list-unstyled">
          <li
            v-for="instruction in recipe.instructions?.split('\n') || []"
            :key="instruction"
          >
            {{ instruction }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Recipe not found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useRecipeStore } from "@/store/recipeStore";

const route = useRoute();
const store = useRecipeStore();

const recipeId = Number(route.params.id);
const recipe = ref(store.recipes.find((r) => r.id === recipeId));

const cleanedAuthorName = computed(() => {
  let authorName = "";
  if (recipe.value) {
    if (
      typeof recipe.value.author === "object" &&
      recipe.value.author !== null
    ) {
      authorName = recipe.value.author.name || "Unknown Author";
    } else {
      authorName = recipe.value.author || "Unknown Author";
    }
  }
  authorName = authorName.split(/[^a-zA-Z\s]/)[0].trim();
  return authorName;
});

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.fixed-size-image {
  width: 680px;
  height: 680px;
  object-fit: cover;
}
</style>
