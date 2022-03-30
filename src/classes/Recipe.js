class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
    this.ingredientsNeeded = [];
    this.recipeCost = 0;
  };

  findIngredientsNeeded(ingredients) {
    const ingredientIds = this.ingredients.map(ingredient => {
      return ingredient.id;
    });
    const filteredIngredients = ingredients.filter(ingredient => {
      if (ingredientIds.includes(ingredient.id)) {
        return ingredient;
      };
    });
    filteredIngredients.forEach(ingredient => {
      this.ingredientsNeeded.push(ingredient.name);
    });
  };

  getCost(ingredients) {
    const idsAndCosts = ingredients.reduce((idCostObj, ingredient) => {
      idCostObj[ingredient.id] = ingredient.estimatedCostInCents;
      return idCostObj;
    }, {});

    const totalCost = this.ingredients.reduce((totalCost, ingredient) => {
      totalCost += (ingredient.quantity.amount * idsAndCosts[ingredient.id]);
      return totalCost;
    }, 0);
    this.recipeCost = totalCost / 100;
    };

    getInstructions() {
      return this.instructions;
    };
  }


export default Recipe;
