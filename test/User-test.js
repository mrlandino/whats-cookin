import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import {recipeData, usersData, ingredients} from "./data";

describe('User', () => {
  let user, recipe1, recipe2, recipe3;

  beforeEach(() => {
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    user = new User(usersData[0]);
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  })

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have a property that holds the users name', () => {
    expect(user.name).to.equal("Saige O'Kon");
  });

  it('should have a property that holds the users id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a property that holds the users pantry items', () => {
    expect(user.pantry).to.equal(usersData[0].pantry);
  });

  it('should have a method that allows the users to favorite a recipe', () => {

    user.addFavoriteRecipes(recipe1);
    user.addFavoriteRecipes(recipe2);

    expect(user.favoriteRecipes.length).to.equal(2);
    expect(user.favoriteRecipes[1]).to.equal(recipe2);
    expect(user.favoriteRecipes[2]).to.equal(recipe3);
  });

  it('should have a method that allows the users to remove a favorite recipe', () => {

    user.addFavoriteRecipes(recipe1);
    user.addFavoriteRecipes(recipe2);
    user.removeFavoriteRecipes(recipe1);

    expect(user.favoriteRecipes.length).to.equal(1);
    expect(user.favoriteRecipes[0]).to.equal(recipe2);

    user.removeFavoriteRecipes('banana');

    expect(user.favoriteRecipes.length).to.equal(1);
    expect(user.favoriteRecipes[0]).to.equal(recipe2);
  });

  it('should have a method that allows the users to remove a favorite recipe while there is a tag or filter applied', () => {

    user.addFavoriteRecipes(recipe1);
    user.addFavoriteRecipes(recipe2);
    user.filterFavoriteByTag("snack");

    expect(user.favoritesByTag.length).to.equal(1);
    expect(user.favoriteRecipes.length).to.equal(2);

    user.removeFavoriteRecipes(recipe1);

    expect(user.favoriteRecipes.length).to.equal(1);
    expect(user.favoritesByTag.length).to.equal(0);
    expect(user.favoriteRecipes[0]).to.equal(recipe2);

    user.removeFavoriteRecipes('banana');

    expect(user.favoriteRecipes.length).to.equal(1);
    expect(user.favoriteRecipes[0]).to.equal(recipe2);
  });

  it('should have a method that allows the users to add a recipe to their menu to cook for that week', () => {

    user.addRecipeToMenu(recipe1);
    user.addRecipeToMenu(recipe2);

    expect(user.recipesToCook.length).to.equal(2);
    expect(user.recipesToCook[0]).to.equal(recipe1);
  });

  it('should have a method that filters favorite recipes by tag', () => {

    user.addFavoriteRecipes(recipe1);
    user.filterFavoriteByTag("snack");

    expect(user.favoritesByTag).to.deep.equal([recipe1]);

    user.filterFavoriteByTag("dinner");

    expect(user.favoritesByTag).to.deep.equal([]);
  });

  it('should have a method that filters favorite recipes by name', () => {

    user.addFavoriteRecipes(recipe1);
    user.filterFavoriteByName("chocolate");

    expect(user.favoritesByName).to.deep.equal([recipe1]);

    user.filterFavoriteByName("bread");

    expect(user.favoritesByName).to.deep.equal([]);
  });

})
