import User from "./User.js";


class Pantry {
  constructor(user) {
    this.userPantry = user.pantry;
    this.currentPantry = [];
    this.ingredientsMissing = [];
  }

  assessIngredients(recipe) {
    let recipeIngredientIds = [];
    let pantryIngredientIds = [];
    let missingIngredIds = [];

    recipe.ingredients.forEach((recipeIngredient) => {
      recipeIngredientIds.push(recipeIngredient.id);
    });

    this.userPantry.forEach((pantryIngredient) => {
      pantryIngredientIds.push(pantryIngredient.ingredient);
    });

    recipe.ingredients.reduce((acc, recipeIngredient) => {
      this.userPantry.forEach(pantryItem => {
        if(recipeIngredient.id === pantryItem.ingredient && recipeIngredient.quantity.amount > pantryItem.amount) {
          var difference = recipeIngredient.quantity.amount - pantryItem.amount;
          var element = {id: recipeIngredient.id, quantity: difference};
          if (!acc.includes(element)) {
               acc.push(element);
               missingIngredIds.push(element.id);
          };
        };
      });

      recipeIngredientIds.forEach(idNum => {
        console.log("MISSING INGREDIENTS", missingIngredIds);
        // console.log("RECIPEINGREDIENT ID", recipeIngredient.id)

        if(!pantryIngredientIds.includes(idNum) && !missingIngredIds.includes(idNum) && recipeIngredient.id === idNum) {
          // console.log(idNum, recipeIngredient.id);
          acc.push({id: idNum, quantity: recipeIngredient.quantity.amount});
          missingIngredIds.push(idNum);
        };
      });
      return this.ingredientsMissing = acc;
    }, []);

    if (this.ingredientsMissing.length === 0) {
      recipe.canBeCooked = true;
    } else {
      recipe.canBeCooked = false;
    };
    // MOVE above method into its own function as a helper function
  };
}

export default Pantry
