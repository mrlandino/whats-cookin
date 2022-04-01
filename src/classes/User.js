class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  };

  addFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  };

  removeFavoriteRecipes(recipe) {
    this.favoriteRecipes.splice(recipe, 1);
  };

  addRecipeToMenu(recipe) {
    this.recipesToCook.push(recipe);
  };


}

export default User;
