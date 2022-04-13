import { expect } from 'chai';
import Pantry from '../src/classes/Pantry';
import Recipe from '../src/classes/Recipe';
import User from '../src/classes/User';

import {recipeData, usersData, ingredients, ingredients2} from "./data";

describe('Pantry', () => {
  let recipe;
  let recipe2;
  let user;
  let pantry;

  beforeEach(() => {
  recipe = new Recipe(recipeData[0]);
  recipe2 = new Recipe(recipeData[1]);
  user = new User(usersData[0]);
  pantry = new Pantry(user);

  });

  it('Should be a function', () => {
    expect(Pantry).to.be.a('function');
  });
//ADD TESTS FOR CONSTRUCTOR PROPS

  it ("Should be able to assess ingredients in the user's pantry and decide if a recipe can be cooked or not", () => {

    pantry.assessIngredients(recipe)
    console.log("PANTRY", pantry.ingredientsMissing)
    console.log("RECIPE", recipe.canBeCooked)
    // expect()
  });

});
