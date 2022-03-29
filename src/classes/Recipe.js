class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
    this.ingredientsNeeded = [];
  };

  findIngredientsNeeded(ingredients) {
    const ingredientIds = this.ingredients.map(ingredient => {
      return ingredient.id;
    });
    const filteredIngredients = ingredients.filter(ingredient => {
      if (ingredientIds.includes(ingredient.id)) {
        return ingredient;
      }
    });
    filteredIngredients.forEach(ingredient => {
      this.ingredientsNeeded.push(ingredient.name)
    });
  };
}

export default Recipe;
