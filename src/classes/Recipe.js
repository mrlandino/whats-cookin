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
    this.isFavorite = false;
    this.canBeCooked = true;
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
      this.ingredientsNeeded.push({name: ingredient.name, id:ingredient.id});
    });

    this.ingredientsNeeded.map(ingredient => {
        this.ingredients.forEach(ingredient2 => {
        if (ingredient.id === ingredient2.id) {
          ingredient.amount = ingredient2.quantity.amount;
          ingredient.unit = ingredient2.quantity.unit;
        };
      });
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
    this.recipeCost = (totalCost / 100).toFixed(2);
    };

    getInstructions() {
      return this.instructions;
    };
  };


export default Recipe;
