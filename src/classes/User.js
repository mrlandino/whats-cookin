class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.favoritesByTag = [];
    this.favoritesByName = [];
  };

  addFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  };

  removeFavoriteRecipes(recipe) {
    this.favoriteRecipes = this.favoriteRecipes.reduce((acc, meal) => {
      if(recipe.id !== meal.id) {
        acc.push(meal);
      }
      return acc;
    }, []);
    return this.favoriteRecipes;
  };

  addRecipeToMenu(recipe) {
    this.recipesToCook.push(recipe);
  };

  filterFavoriteByTag(tag) {
    if(this.favoritesByName.length > 0) {
      this.favoritesByTag = this.favoritesByName.filter(recipe => {
        return recipe.tags.includes(tag);
      });
    } else {
      this.favoritesByTag = this.favoriteRecipes.filter(recipe => {
        return recipe.tags.includes(tag);
      });
    };
  };

  filterFavoriteByName(name) {
    let upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
    if(this.favoritesByTag.length > 0) {
      this.favoritesByName = this.favoritesByTag.filter(recipe => {
        return recipe.name.includes(upperCaseName);
      });
    } else {
      this.favoritesByName = this.favoriteRecipes.filter(recipe => {
        return recipe.name.includes(upperCaseName);
      });
    };
  };
}

export default User;
