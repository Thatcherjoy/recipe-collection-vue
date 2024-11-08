<template>
  <div class="container mt-5">
    <button @click="goBack" class="btn btn-secondary back-button">Back</button>
    <h2>Add a New Recipe</h2>
    <form @submit.prevent="addRecipe">
      <div class="mb-3">
        <label for="name" class="form-label">Recipe Name</label>
        <input
          v-model="name"
          id="name"
          class="form-control"
          placeholder="Recipe Name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">Author</label>
        <input
          v-model="author"
          id="author"
          class="form-control"
          placeholder="Author"
          required
        />
      </div>
      <div class="mb-3">
        <label for="ingredients" class="form-label"
          >Ingredients (comma separated)</label
        >
        <textarea
          v-model="ingredientsString"
          id="ingredients"
          class="form-control"
          placeholder="Ingredients"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="instructions" class="form-label">Instructions</label>
        <textarea
          v-model="instructions"
          id="instructions"
          class="form-control"
          placeholder="Instructions"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add Recipe</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { useRouter } from "vue-router";

const store = useRecipeStore();
const router = useRouter();

const name = ref("");
const author = ref("");
const ingredientsString = ref("");
const instructions = ref("");

const goBack = () => {
  router.go(-1);
};

const addRecipe = () => {
  if (
    name.value &&
    author.value &&
    ingredientsString.value &&
    instructions.value
  ) {
    const ingredientsArray = ingredientsString.value
      .split(",")
      .map((ingredient) => ingredient.trim());
    const newRecipe = {
      id: Date.now(),
      name: name.value,
      author: author.value,
      image: [],
      ingredients: ingredientsArray,
      instructions: instructions.value,
    };
    store.saveRecipe(newRecipe);

    name.value = "";
    author.value = "";
    ingredientsString.value = "";
    instructions.value = "";

    router.push("/");
  } else {
    alert("Please fill in all fields");
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.btn-secondary {
  margin-bottom: 20px;
}
</style>
