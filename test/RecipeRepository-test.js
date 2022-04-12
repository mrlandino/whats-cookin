import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import {recipeData, usersData, ingredients} from "./data";

describe('Recipe Repository', () => {
  let recipeRepository;

  beforeEach(() => {
    recipeRepository = new RecipeRepository(recipeData);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('should have data bank of recipes', () => {
    expect(recipeRepository.recipes[0]).to.deep.equal(recipeData[0]);
    expect(recipeRepository.recipes[1]).to.deep.equal(recipeData[1]);
  });

  it('should have a method that filters recipes by tag', () => {

    recipeRepository.filterByTag("snack");

    console.log()
    expect(recipeRepository.filteredRecipesTag).to.deep.equal([recipeData[0]]);

    recipeRepository.filterByTag("morning meal");

    expect(recipeRepository.filteredRecipesTag).to.deep.equal([]);
  });

  it('should not return anything if the tag does not apply to the data', () => {

    recipeRepository.filterByTag("morning meal");

    expect(recipeRepository.filteredRecipesTag).to.deep.equal([]);
  });

  it('should have a method that filters recipes by name', () => {

    recipeRepository.filterByName("chocolate");

    expect(recipeRepository.filteredRecipesName).to.deep.equal([recipeData[0]]);

    recipeRepository.filterByName("bread");

    expect(recipeRepository.filteredRecipesName).to.deep.equal([]);
  });

  it('should return nothing if the name in not in the data', () => {

    recipeRepository.filterByName("bread");

    expect(recipeRepository.filteredRecipesName).to.deep.equal([]);
  });

  it('should be able to filter recipes by name and tag at the same time', () => {

    recipeRepository.filterByName("chocolate");
    recipeRepository.filterByTag("snack");

    expect(recipeRepository.filteredRecipesTag).to.deep.equal([recipeData[0]]);
  });

  it('it should return nothing if the search term is contained in the data but not the tag', () => {

    recipeRepository.filterByName("chocolate");
    recipeRepository.filterByTag("dinner");

    expect(recipeRepository.filteredRecipesTag).to.deep.equal([]);
    expect(recipeRepository.filteredRecipesName).to.deep.equal([recipeData[0]]);
  });

  it('it should return nothing if the search term is not contained in the data but the tag is', () => {

    recipeRepository.filterByName("bread");
    recipeRepository.filterByTag("snack");

    expect(recipeRepository.filteredRecipesName).to.deep.equal([]);
    expect(recipeRepository.filteredRecipesTag).to.deep.equal([recipeData[0]]);
  });

  it('it should return nothing if the search term and tag are not contained in the data', () => {

    recipeRepository.filterByName("Milk");
    recipeRepository.filterByTag("morning meal");

    expect(recipeRepository.filteredRecipesName).to.deep.equal([]);
    expect(recipeRepository.filteredRecipesTag).to.deep.equal([]);
  });
});
