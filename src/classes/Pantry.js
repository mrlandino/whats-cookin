import User from "./User.js";


class Pantry {
  constructor(user) {
    this.userPantry = user.pantry;
    this.currentPantry = [];
    this.ingredientsMissing = [];
  }

  assessIngredients(recipe) {
    // console.log(recipe)
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
        // console.log(this.userPantry)
      this.userPantry.forEach(pantryItem => {
          if(recipeIngredient.id === pantryItem.ingredient && recipeIngredient.quantity.amount > pantryItem.amount) {
              var difference = recipeIngredient.quantity.amount - pantryItem.amount;
              var element = {id: recipeIngredient.id, quantity: difference};
              if (!acc.includes(element)) {
                   acc.push(element);
                   missingIngredIds.push(element.id);
              }
          }
      });

      recipeIngredientIds.forEach(idNum => {
        console.log("MISSING INGREDIENTS BEFORE", missingIngredIds)

        if(!pantryIngredientIds.includes(idNum) && !missingIngredIds.includes(idNum) && recipeIngredient.id === idNum) {
          console.log(idNum, recipeIngredient.id)
          acc.push({id: idNum, quantity: recipeIngredient.quantity.amount});
          missingIngredIds.push(idNum)
          console.log("MISSING INGREDIENTS 2", missingIngredIds)
        }
      })
      return this.ingredientsMissing = acc;
    }, []);

    if (this.ingredientsMissing.length === 0) {
        recipe.canBeCooked = true;
      } else {
        recipe.canBeCooked = false;
      }
  }

  //
  //
  //       if(recipeIngredient.id !== pantryItem.ingredient) {
  //         console.log("RECIPE INGREDIENT ID", recipeIngredient.id)
  //         console.log("PANTRY ITEM ID", pantryItem.ingredient)
  //         acc.forEach(ingredient => {
  //           // console.log("CURRENT INGREDIENT", ingredient)
  //           // console.log(acc)
  //           if(recipeIngredient.id !== ingredient.id) {
  //             console.log("YOU ARE HERE")
  //             acc.push({id: recipeIngredient.id, quantity: recipeIngredient.quantity.amount});
  //           }
  //         })
  //       }
  //
  //     })
  //     return this.ingredientsMissing = acc;
  //   }, []);
  //
  //   if (this.ingredientsMissing.length === 0) {
  //     recipe.canBeCooked = true;
  //   } else {
  //     recipe.canBeCooked = false;
  //   }
  //
  // }
  //








    // recipe.ingredients.forEach((ingredient) => {
    //   this.userPantry.forEach((item) => {
    //     // console.log(ingredient.id, item.ingredient)
    //     if (ingredient.id === item.ingredient) {
    //       if (ingredient.quantity.amount > item.amount) {
    //         var difference = ingredient.quantity.amount - item.amount;
    //         var element = {id: ingredient.id, quantity: difference}
    //         if (!this.ingredientsMissing.includes(element)) {
    //            this.ingredientsMissing.push(element)
    //         }
    //       }
    //     }
    //
    //     if (!this.getIngredientIds().includes(ingredient.id)) {
    //       // console.log("it hits")
    //       difference = ingredient.quantity.amount - item.amount;
    //       // console.log(difference)
    //       element = {id: ingredient.id, quantity: difference}
    //       // console.log(element)
    //       if (!this.ingredientsMissing.includes(element)) {
    //         console.log(this.ingredientsMissing)
    //         console.log("ELEMENT", element)
    //          this.ingredientsMissing.push(element)
    //       }
    //     }
    //   })
    // })
    //
    // if (this.ingredientsMissing.length === 0) {
    //   recipe.canBeCooked = true;
    // } else {
    //   recipe.canBeCooked = false;
    // }
  // getIngredientIds() {
  //   let pantryIds = this.userPantry.reduce((arr, ingredient) => {
  //     arr.push(ingredient.ingredient)
  //     return arr
  //   }, [])
  //   return pantryIds
  // }
}

export default Pantry
