class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
  };

  addFavoriteRecipes(recipe) {
    this.favoriteRecipes.push(recipe);
  };

  removeFavoriteRecipes(recipe) {
    this.favoriteRecipes.splice(recipe, 1);
  }
}

export default User;
