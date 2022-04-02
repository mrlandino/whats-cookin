import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import recipeData from './data/recipes.js';
import ingredientsData from './data/ingredients.js';
import usersData from './data/users.js';
import RecipeRepository from './classes/RecipeRepository.js';
import Recipe from './classes/Recipe.js';
import User from './classes/User.js';

// VARIABLES-----------------------------------------------
let currentRecipe;
let currentUser;
const recipesList = new RecipeRepository(recipeData);
const allRecipes = document.querySelector(".all-recipe-thumbnails");
const allRecipesContainer = document.querySelector(".all-recipes-container");
const recipeDetailsContainer = document.querySelector(".recipe-details-container");
const filterByTag = document.querySelector(".filter-tag-button");
const dropdownContent = document.querySelector(".dropdown-content");
const searchInput = document.querySelector(".search-button-input");
const largeStar = document.querySelector(".large-star");

// EVENT LISTENERS-----------------------------------------------
window.onload = (event) => {
  displayAllRecipes();
  injectFilterTags();
  instantiateUser();
};

allRecipes.addEventListener('click', function(e) {
  if (e.target.parentElement.classList.contains('recipe-thumbnail')) {
    displayCard();
    findRecipeInfo(e.target.parentElement.id);
    updateRecipeCard();
  };
});

allRecipes.addEventListener("click", function(e) {
  if (e.target.classList.contains('star-icon')) {
    addRecipeToFavorites(e.target.parentElement.id);
    changeStar(e.target);
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
  recipesList.recipes.forEach((recipe, index) => {
    allRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details" id=${recipe.id}>
                  <p>${recipe.name}</p>
                  <img class="star-icon" data-index='${recipe.id}' src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
                  <img class="favorited-star-icon hidden"  src="https://www.flaticon.com/free-icon/star_1828884?term=gold%20star&page=1&position=1&page=1&position=1&related_id=1828884&origin=search" alt="favorite recipe icon">
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
              <img class="large-star" src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
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
                  <img class="star-icon" id=${recipe.id} src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
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
                  <img class="star-icon" id=${recipe.id} src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  allRecipes.innerHTML = searchedRecipesHTML;
};

const instantiateUser = () => {
  let randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  currentUser = new User(randomUser);
};

const addRecipeToFavorites = (id) => {
  let recipeClicked = recipesList.recipes.find(recipe => `${recipe.id}` === id);
  // let newRecipe = new Recipe(recipeClicked);
  // if (!recipeClicked.isFavorite) {
  //   recipeClicked.isFavorite = true;
  // } else {
  //   recipeClicked.isFavorite = false;
  // };
  currentUser.addFavoriteRecipes(recipeClicked);
  console.log(recipeClicked);
  console.log(currentUser);
};

const changeStar = (target) => {
  if (target.src === "https://cdn-icons-png.flaticon.com/512/1828/1828970.png") {
    target.src = "https://cdn-icons-png.flaticon.com/512/1040/1040230.png";
  } else {
    target.src = "https://cdn-icons-png.flaticon.com/512/1828/1828970.png";
  };
};

// Give star icon a unique class and querySelector
// If e.target.class.includes(star class), then
// Get the id of the star's parent element?

// That parent element should represent a recipe thumbnail or recipe card
// Get that recipe object's information and
  // if recipe.favorite === false
    // Add recipe to favorites
  // if recipe.favorite === true
    // remove recipe from favorites
// change color of star when clicked

// Add functionality to not add recipes more than once

// Display favorite recipes (user.favoriteRecipes) when you click the favorite recipes button
