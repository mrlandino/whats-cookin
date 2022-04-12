import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import {recipeData, usersData, ingredients, ingredients2} from "./data";

describe('Recipe', () => {
  let recipe;
  let recipe2;

  beforeEach(() => {
    recipe = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should be an instance of RecipeRepository', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('Should store recipe details', () => {
    expect(recipe.id).to.deep.equal(recipeData[0].id);
    expect(recipe.image).to.deep.equal(recipeData[0].image);
    expect(recipe.ingredients).to.deep.equal(recipeData[0].ingredients);
    expect(recipe.instructions).to.deep.equal(recipeData[0].instructions);
    expect(recipe.name).to.deep.equal(recipeData[0].name);
    expect(recipe.tags).to.deep.equal(recipeData[0].tags);
  });

  it('Should have a method that will store a list of ingredients needed', () => {

    recipe.findIngredientsNeeded(ingredients);

    expect(recipe.ingredientsNeeded.length).to.equal(3);
    expect(recipe.ingredientsNeeded[0].name).to.equal("wheat flour");
    expect(recipe.ingredientsNeeded[0].amount).to.equal(1.5);
  });

  it('Should have a method that will determine the cost of the recipe', () => {

    recipe.getCost(ingredients);
    expect(recipe.recipeCost).to.equal("9.76");

    recipe2.getCost(ingredients2);
    expect(recipe2.recipeCost).to.equal("21.91");
  });

  it('Should have a method that will return the recipe instructions', () => {

    let instructions = recipe.getInstructions();

    expect(instructions).to.equal(recipeData[0].instructions);
  });
})
