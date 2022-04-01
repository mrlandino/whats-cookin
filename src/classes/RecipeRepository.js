class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData;
    this.filteredRecipesTag = [];
    this.filteredRecipesName = [];
  }
//maindish
  filterByTag(tag) {
    if(this.filteredRecipesName.length > 0) {
      this.filteredRecipesTag = this.filteredRecipesName.filter(recipe => {
        return recipe.tags.includes(tag);
      });
    } else {
      this.filteredRecipesTag = this.recipes.filter(recipe => {
        return recipe.tags.includes(tag);
      });
    };
  };

  filterByName(name) {
    let upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    if(this.filteredRecipesTag.length > 0) {
      this.filteredRecipesName = this.filteredRecipesTag.filter(recipe => {
        return recipe.name.includes(upperCaseName);
      });
    } else {
      this.filteredRecipesName = this.recipes.filter(recipe => {
        return recipe.name.includes(upperCaseName);
      });
    };
  };
}

export default RecipeRepository;
