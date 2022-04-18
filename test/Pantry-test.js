import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';

import {recipeData, usersData, ingredients, ingredients2} from "./data";

describe('Pantry', () => {
  let recipe;
  let recipe2;
  let user;
  let user2;
  let pantry;
  let pantry2;

  beforeEach(() => {
  recipe = new Recipe(recipeData[0]);
  recipe2 = new Recipe(recipeData[1]);
  user = new User(usersData[0]);
  user2 = new User(usersData[1]);
  pantry = new Pantry(user);
  pantry2 = new Pantry(user2);
  });

  it("Should be a function", () => {
    expect(Pantry).to.be.a('function');
  });

  it("Should be an instance of the Pantry", () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it("Should be able to store information from the user's pantry", () => {
    expect(pantry.userPantry).to.deep.equal(user.pantry);
  });

  it("Should have the ability to store a current pantry", () => {
    expect(pantry.currentPantry).to.deep.equal([]);
  });

  it("Should have the ability to store the ingredients missing to cook a recipe", () => {
    expect(pantry.ingredientsMissing).to.deep.equal([]);
  });

  it ("Should be able to assess ingredients in the user's pantry and decide if a recipe can be cooked or not", () => {

    pantry.assessIngredients(recipe);
    expect(recipe.canBeCooked).to.equal(false);
    expect(pantry.ingredientsMissing).to.deep.equal([{"id": 18372, "quantity": 0.25}]);

    pantry2.assessIngredients(recipe2);
    expect(recipe2.canBeCooked).to.equal(true);
    expect(pantry2.ingredientsMissing).to.deep.equal([]);
  });

  it("Should be able to update the user's current pantry with information needed", () => {

    pantry.updateCurrentPantry(ingredients);
    expect(pantry.currentPantry[0].name).to.equal('wheat flour');
    expect(pantry.currentPantry[0].id).to.equal(20081);
    expect(pantry.currentPantry[0].amount).to.equal(5);

    pantry2.updateCurrentPantry(ingredients2);
    expect(pantry2.currentPantry[1].name).to.equal('apple');
    expect(pantry2.currentPantry[1].id).to.equal(9003);
    expect(pantry2.currentPantry[1].amount).to.equal(2);
  });

  it("Should be able to repopulate the current pantry", () => {

    pantry.updateCurrentPantry(ingredients);
    pantry.repopulateCurrentPantry(ingredients);
    expect(pantry.currentPantry[0].name).to.equal('wheat flour');
    expect(pantry.currentPantry[0].id).to.equal(20081);
    expect(pantry.currentPantry[0].amount).to.equal(5);

    pantry2.updateCurrentPantry(ingredients2);
    pantry2.repopulateCurrentPantry(ingredients2);
    expect(pantry2.currentPantry[1].name).to.equal('apple');
    expect(pantry2.currentPantry[1].id).to.equal(9003);
    expect(pantry2.currentPantry[1].amount).to.equal(2);
  });

  it("Should be able to update ingredients once a recipe is cooked", () => {

    pantry.updateCurrentPantry(ingredients);
    pantry.removeIngredients(recipe);
    pantry.repopulateCurrentPantry(ingredients);

    expect(pantry.currentPantry[0].name).to.equal('wheat flour');
    expect(pantry.currentPantry[0].id).to.equal(20081);
    expect(pantry.currentPantry[0].amount).to.equal(5);
  });

  it("Should be able to add an ingredient to a user's pantry", () => {

    pantry.updateCurrentPantry(ingredients);
    pantry.addIngredients(ingredients);
    pantry.repopulateCurrentPantry(ingredients);

    expect(pantry.currentPantry[0].name).to.equal('wheat flour');
    expect(pantry.currentPantry[0].id).to.equal(20081);
    expect(pantry.currentPantry[0].amount).to.equal(5);
  });
});
