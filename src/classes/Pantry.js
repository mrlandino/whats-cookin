import User from "./User.js";


class Pantry {
  constructor(user) {
    this.userPantry = user.pantry;
    this.currentPantry = [];
    this.ingredientsMissing = [];

  }
  assessIngredients(recipe) {
    recipe.ingredients.forEach((ingredient) => {
      this.userPantry.forEach((item) => {
        // if (ingredient.id === item.id && ingredient.quantity.amount > item.amount) {
        //
        // }
        console.log(ingredient.id, item.ingredient)
        if (ingredient.id === item.ingredient) {
          // console.log("ingredients match")
          if (ingredient.quantity.amount > item.amount) {
            // console.log("quantities dont match")
            var difference = ingredient.quantity.amount - item.amount;
            console.log(difference)
            var element = {id: ingredient.id, quantity: difference}
            console.log(element)
            if (!this.ingredientsMissing.includes(element)) {
              // console.log("it works")
               this.ingredientsMissing.push(element)
            }
          }
        }
        if (!this.getIngredientIds().includes(ingredient.id)) {
          // console.log("it hits")
          difference = ingredient.quantity.amount - item.amount;
          // console.log(difference)
          element = {id: ingredient.id, quantity: difference}
          // console.log(element)
          if (!this.ingredientsMissing.includes(element)) {
            console.log(this.ingredientsMissing)
            console.log("ELEMENT", element)
             this.ingredientsMissing.push(element)
          }
        }
        // } else if (ingredient.id !== item.ingredient && !this.ingredientsMissing.includes(element)) {
        //   console.log(element)
        //     this.ingredientsMissing.push(element)
        //   // console.log("ingredients don't match")
        //   // if (!this.ingredientsMissing.includes(element)) {     this.ingredientsMissing.push(element)
        //   // }
        // }
      })
    })
    if (this.ingredientsMissing.length === 0) {
      recipe.canBeCooked = true;
    } else {
      recipe.canBeCooked = false;
    }
  }
  getIngredientIds() {
    let pantryIds = this.userPantry.reduce((arr, ingredient) => {
      arr.push(ingredient.ingredient)
      return arr
    }, [])
    return pantryIds
  }
}

export default Pantry
