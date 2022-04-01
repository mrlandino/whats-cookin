import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import recipeData from './data/recipes.js';
import ingredientsData from './data/ingredients.js'
import RecipeRepository from './classes/RecipeRepository.js';
import Recipe from './classes/Recipe.js';



// VARIABLES-----------------------------------------------
let currentRecipe;
const recipesList = new RecipeRepository(recipeData);
const allRecipes = document.querySelector(".all-recipe-thumbnails");
const allRecipesContainer = document.querySelector(".all-recipes-container");
const recipeDetailsContainer = document.querySelector(".recipe-details-container");
const filterByTag = document.querySelector(".filter-tag-button");
const dropdownContent = document.querySelector(".dropdown-content");
const searchInput = document.querySelector(".search-button-input");
// const filterTargets = document.querySelectorAll(".tag-hover")


// EVENT LISTENERS-----------------------------------------------
window.onload = (event) => {
  displayAllRecipes();
  injectFilterTags();
};

allRecipes.addEventListener('click', function(e) {
  if (e.target.parentElement.classList.contains('recipe-thumbnail')) {
    displayCard();
    findRecipeInfo(e.target.parentElement.id);
    updateRecipeCard();
  };
});

dropdownContent.addEventListener("click", function(e) {
  if(e.target.classList.contains('tag-hover')) {
    applyFilter(e.target.dataset.id);
    displayFilteredContent();
  };
});

searchInput.addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    event.preventDefault();
    applySearch(`${searchInput.value}`);
    displaySearchedContent();
  };
});

// EVENT HANDLERS------------------------------------------------
const showElement = element => {
  element.classList.remove('hidden');
};

const hideElement = element => {
  element.classList.add('hidden');
};

const displayAllRecipes = () => {
  let allRecipesHTML = "";
  recipesList.recipes.forEach((recipe) => {
    allRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  allRecipes.innerHTML = allRecipesHTML;
};

const displayCard = () => {
  hideElement(allRecipesContainer);
  showElement(recipeDetailsContainer);
};

const findRecipeInfo = (id) => {
  let newRecipe = recipesList.recipes.find((recipe) => {
    return `${recipe.id}` === id;
  });
  currentRecipe = new Recipe(newRecipe);
  return currentRecipe;
};

const updateRecipeCard = () => {
  currentRecipe.findIngredientsNeeded(ingredientsData);
  currentRecipe.getCost(ingredientsData);
  let recipe = "";
  recipe += `<div class="recipe-title">
              <h2>${currentRecipe.name}</h2>
              <img class="larger-star">
            </div>
            <div class="image-and-ingredients-container">
              <img class="recipe-image" src=${currentRecipe.image} alt=${currentRecipe.name}>
              <div class="ingredients-container">
                <h3>Ingredients:</h3>
                <div class="ingredient-list-name-and-amounts">`;

  let ingredientList = "";
  currentRecipe.ingredientsNeeded.forEach(ingredient => {
    ingredientList += `<p>${ingredient.name} ${ingredient.amount} ${ingredient.unit}</p>`;
  });
  let recipeCost = "";
  recipeCost += `<p>$${currentRecipe.recipeCost}</p>`;
  let instructionsList = "";
  currentRecipe.instructions.forEach(instruction => {
    instructionsList += `<p class="instructions">${instruction.number}. ${instruction.instruction}</p>`;
  });

  recipeDetailsContainer.innerHTML = (recipe + ingredientList + recipeCost + `</div></div></div><div class="recipe-instructions"><h3>Instructions:</h3>` + instructionsList + `</div>`);
};

const injectFilterTags = () => {
  let tags = "";
  let uniqueTags;
  uniqueTags = recipesList.recipes.reduce((allTags, recipe) => {
    recipe.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      };
    });
    return allTags;
  }, []);

  uniqueTags.forEach((tag) => {
    tags += `<p class="tag-hover" data-id="${tag}">${tag}</p>`
  });
  dropdownContent.innerHTML = tags;
};

const applyFilter = (id) => {
  let tag = id;
  recipesList.filterByTag(tag);
};

const displayFilteredContent = () => {
  allRecipes.innerHTML = "";
  let filteredRecipesHTML = "";
  recipesList.filteredRecipesTag.forEach((recipe) => {
    filteredRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  allRecipes.innerHTML = filteredRecipesHTML;
};

const applySearch = (input) => {
  recipesList.filteredRecipesTag = [];
  recipesList.filterByName(input);
};

const displaySearchedContent = () => {
  allRecipes.innerHTML = "";
  let searchedRecipesHTML = "";
  recipesList.filteredRecipesName.forEach((recipe) => {
    searchedRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  allRecipes.innerHTML = searchedRecipesHTML;
};
