import { defineStore } from "pinia";
import axios from "axios";

interface Recipe {
  id: number;
  name: string;
  author?: { name: string } | string;
  image: string[];
  ingredients: string[];
  instructions: string;
}

export const useRecipeStore = defineStore("recipeStore", {
  state: () => ({
    recipes: [] as Recipe[],
    savedRecipes: JSON.parse(
      localStorage.getItem("savedRecipes") || "[]"
    ) as Recipe[],
    filteredRecipes: [] as Recipe[],
    currentPage: 1,
    itemsPerPage: 9,
  }),
  actions: {
    async fetchRecipes() {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/micahcochran/json-cookbook/refs/heads/main/cookbook-100.json"
        );
        console.log("API Response:", response.data); // Log the full API response
        this.recipes =
          response.data.map((recipe: any, index: number) => ({
            id: index + 1,
            name: recipe.name,
            author: recipe.author,
            image: recipe.image,
            ingredients: recipe.recipeIngredient || [],
            instructions: Array.isArray(recipe.recipeInstructions)
              ? recipe.recipeInstructions
                  .map((instruction: any) => instruction.text)
                  .join("\n")
              : typeof recipe.recipeInstructions === "string"
              ? recipe.recipeInstructions
              : "",
          })) || [];
        this.filteredRecipes = this.recipes;
        console.log("Fetched recipes:", this.recipes); // Log fetched recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    },
    saveRecipe(recipe: Recipe) {
      this.savedRecipes.push(recipe);
      localStorage.setItem("savedRecipes", JSON.stringify(this.savedRecipes));
    },
    removeRecipe(recipe: Recipe) {
      this.savedRecipes = this.savedRecipes.filter(
        (r: Recipe) => r.id !== recipe.id
      );
      localStorage.setItem("savedRecipes", JSON.stringify(this.savedRecipes));
    },
    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.filteredRecipes = this.recipes;
    },
    filterRecipes(query: string) {
      const cleanedQuery = query.toLowerCase();
      this.filteredRecipes = this.recipes.filter((recipe) => {
        let authorName = "";
        if (typeof recipe.author === "object" && recipe.author !== null) {
          authorName = recipe.author.name || "Unknown Author";
        } else {
          authorName = recipe.author || "Unknown Author";
        }
        authorName = authorName
          .split(/[^a-zA-Z\s]/)[0]
          .trim()
          .toLowerCase();

        return (
          recipe.name.toLowerCase().includes(cleanedQuery) ||
          authorName.includes(cleanedQuery)
        );
      });
      console.log("Filtered recipes:", this.filteredRecipes);
      this.currentPage = 1;
    },
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.filteredRecipes.length) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  getters: {
    paginatedRecipes: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredRecipes.slice(start, start + state.itemsPerPage);
    },
    totalPages: (state) => {
      return Math.ceil(state.filteredRecipes.length / state.itemsPerPage);
    },
  },
});
