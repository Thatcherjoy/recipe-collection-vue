<template>
  <div class="container mt-5">
    <SearchBar />
    <div class="row">
      <div class="col-md-3">
        <h2 class="mt-4">Saved Recipes</h2>
        <ul class="list-group">
          <li
            v-for="recipe in savedRecipes"
            :key="recipe.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <router-link
              :to="{ name: 'RecipeDetail', params: { id: recipe.id } }"
              >{{ recipe.name }}</router-link
            >
            <i
              class="fas fa-trash-alt text-danger"
              @click="toggleSave(recipe)"
            ></i>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <div class="d-flex justify-content-between align-items-center mt-4">
          <div class="flex-grow-1">
            <h2>Public Recipes</h2>
          </div>
          <router-link to="/add-recipe" class="btn btn-success"
            >Add Recipe</router-link
          >
        </div>
        <div class="row">
          <RecipeCard
            v-for="recipe in paginatedPublicRecipes"
            :key="recipe.id"
            :recipe="recipe"
            class="col-md-4 mb-3"
          />
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4">
          <button
            @click="prevPage"
            :disabled="!hasPrevPage"
            class="btn btn-primary"
          >
            &lt;
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="!hasNextPage"
            class="btn btn-primary"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import RecipeCard from "@/components/RecipeCard.vue";
import { useRecipeStore } from "@/store/recipeStore";

interface Recipe {
  id: number;
  name: string;
  author?: { name: string } | string;
  image: string[];
  ingredients: string[];
  instructions: string;
}

const store = useRecipeStore();

onMounted(() => {
  store.fetchRecipes().then(() => {
    console.log("Recipes in store:", store.recipes);
  });
});

const paginatedPublicRecipes = computed(() => store.paginatedRecipes);
const savedRecipes = computed(() => store.savedRecipes);

const currentPage = computed(() => store.currentPage);
const totalPages = computed(() => store.totalPages);

const prevPage = () => {
  store.prevPage();
};

const nextPage = () => {
  store.nextPage();
};

const hasPrevPage = computed(() => currentPage.value > 1);
const hasNextPage = computed(() => currentPage.value < totalPages.value);

const toggleSave = (recipe: Recipe) => {
  if (store.savedRecipes.some((r) => r.id === recipe.id)) {
    store.removeRecipe(recipe);
  } else {
    store.saveRecipe(recipe);
  }
};
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.list-unstyled {
  padding: 0;
  list-style: none;
}

.list-group-item {
  cursor: pointer;
  transition: background-color 0.3s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.fa-trash-alt {
  cursor: pointer;
}

.btn-primary {
  background-color: #483e3e !important;
  border-color: #483e3e !important;
}

.btn-primary:hover {
  background-color: #707772 !important;
  border-color: #707772 !important;
}
</style>
