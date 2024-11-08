<template>
  <div class="card position-relative">
    <img
      v-if="recipe.image && recipe.image.length > 0"
      :src="recipe.image[0]"
      class="card-img-top fixed-size-image"
      alt="recipe image"
      @click="openRecipeDetail"
    />
    <div v-else class="card-img-top placeholder" @click="openRecipeDetail">
      No Image Available
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ recipe.name }}</h5>
      <p class="card-text">By: {{ cleanedAuthorName }}</p>
    </div>
    <i
      @click="toggleSave"
      :class="[
        'fa-heart',
        isSaved ? 'fas' : 'far',
        'position-absolute',
        'bottom-0',
        'end-0',
        'm-2',
        'text-danger',
      ]"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useRecipeStore } from "@/store/recipeStore";
import { useRouter } from "vue-router";

const props = defineProps<{ recipe: any }>();
const store = useRecipeStore();
const router = useRouter();

const isSaved = computed(() =>
  store.savedRecipes.some((r) => r.id === props.recipe.id)
);

const toggleSave = () => {
  if (isSaved.value) {
    store.removeRecipe(props.recipe);
  } else {
    store.saveRecipe(props.recipe);
  }
};

const cleanedAuthorName = computed(() => {
  let authorName = "";
  if (typeof props.recipe.author === "object" && props.recipe.author !== null) {
    authorName = props.recipe.author.name || "Unknown Author";
  } else {
    authorName = props.recipe.author || "Unknown Author";
  }
  authorName = authorName.split(/[^a-zA-Z\s]/)[0].trim();
  return authorName;
});

const openRecipeDetail = () => {
  router.push({ name: "RecipeDetail", params: { id: props.recipe.id } });
};
</script>

<style scoped>
.fixed-size-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #888;
}

.fa-heart {
  cursor: pointer;
}

.position-absolute {
  position: absolute !important;
}

.bottom-0 {
  bottom: 0 !important;
}

.end-0 {
  right: 0 !important;
}

.m-2 {
  margin: 0.5rem !important;
}

.text-danger {
  color: #dc3545 !important;
}
</style>
