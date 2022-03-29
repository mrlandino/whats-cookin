class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
    this.filteredRecipes;
  }

  filterByTag(tag) {
    this.filteredRecipes = this.recipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });


  }
}

export default RecipeRepository;
