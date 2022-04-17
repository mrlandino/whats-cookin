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
        if(!pantryIngredientIds.includes(idNum) && !missingIngredIds.includes(idNum) && recipeIngredient.id === idNum) {
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

  updateCurrentPantry(ingredients) {
    const ingredientIds = this.userPantry.map(ingredient => {
      return ingredient.ingredient;
    });

    const filteredIngredients = ingredients.filter(ingredient => {
      if (ingredientIds.includes(ingredient.id)) {
        return ingredient;
      }
    });

    filteredIngredients.forEach(ingredient => {
      this.currentPantry.push({name: ingredient.name, id:ingredient.id})
    });

    this.currentPantry.map(ingredient => {
      this.userPantry.forEach(ingredient2 => {
        if (ingredient.id === ingredient2.ingredient) {

          ingredient.amount = ingredient2.amount;
          // ingredient.unit = ingredient2.quantity.unit;
        };
      });
    });
    // this.userPantry = this.currentPantry
  };

  repopulateCurrentPantry(ingredients) {
    const ingredientIds = this.currentPantry.map(ingredient => {
      return ingredient.id;
    });

    // this.currentPantry = [];
    const filteredIngredients = ingredients.filter(ingredient => {
      if (ingredientIds.includes(ingredient.id)) {
        return ingredient;
      }
    });

    filteredIngredients.forEach(ingredient => {
      if (!this.currentPantry.includes({name: ingredient.name, id: ingredient.id, amount: ingredient.amount}) && ingredient.amount !== undefined) {
        this.currentPantry.push({name: ingredient.name, id: ingredient.id, amount: ingredient.amount})
      }

    });
    //
    // this.currentPantry.map(ingredient => {
    //   this.userPantry.forEach(ingredient2 => {
    //     if (ingredient.id === ingredient2.ingredient) {
    //
    //       ingredient.amount = ingredient2.amount;
    //       // ingredient.unit = ingredient2.quantity.unit;
    //     };
    //   });
    // });
  }

  updateMissingIngredients(ingredients) {
    let completeMissingIngredients = [];
    const ingredientIds = this.ingredientsMissing.map(ingredient => {
      return ingredient.id;
    });

    const filteredIngredients = ingredients.filter(ingredient => {
      if (ingredientIds.includes(ingredient.id)) {
        return ingredient;
      }
    });

    filteredIngredients.forEach(ingredient => {
      completeMissingIngredients.push({name: ingredient.name, id:ingredient.id, amount: 0})
    });

    completeMissingIngredients.map(ingredient => {
      this.ingredientsMissing.forEach(ingredient2 => {
        if (ingredient.id === ingredient2.id) {

          ingredient.amount = ingredient2.quantity;
          // ingredient.unit = ingredient2.quantity.unit;
        };
      });
    });

    this.ingredientsMissing = completeMissingIngredients;
  };

  removeIngredients(recipe) {
    // when a recipe is cooked, the ings required for that recipe are removed from the pantry.
    // might be cool to do a .hasBeenCooked on recipe class to apply conditional if it has been cooked, remove these ingredients
    // currentUserPantry - name, id, amount
    // recipe - ingredients needed
    this.currentPantry.forEach((pantryItem) => {
      recipe.ingredientsNeeded.forEach((ingredient) => {
        if (pantryItem.id === ingredient.id) {
          let difference = pantryItem.amount - ingredient.amount
          pantryItem.amount = difference
        }
      })
    })
    return this.currentPantry
  };


  addIngredients(id, name, amount) {
    let amountToAdd = Number(amount)
    let counter = 0;
    this.currentPantry.forEach(item => {
      if (item.id === id) {
        item.amount += amountToAdd;
      } else if (counter < 1) {
        counter++;
        this.currentPantry.push({name: name, id: id, amount: amountToAdd})
      };
    });
    return this.currentPantry;
  };
}

export default Pantry
