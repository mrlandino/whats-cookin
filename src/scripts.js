import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import recipeData from './data/recipes.js'
import RecipeRepository from './classes/RecipeRepository.js'



// VARIABLES-----------------------------------------------
const allRecipes = document.querySelector(".all-recipe-thumbnails");
const allRecipesContainer = document.querySelector(".all-recipes-container");
const recipeDetailsContainer = document.querySelector(".recipe-details-container");

// const recipeTest = [{name: "steph", age: 24}, {name: "olivia", age: 26}]
// recipeData;
const recipesList = new RecipeRepository(recipeData);

// EVENT LISTENERS-----------------------------------------------
window.onload = (event) => {
  displayAllRecipes()
};

allRecipes.addEventListener('click', function(e) {
  if (e.target.parentElement.classList.contains('recipe-thumbnail')) {
    displayCard();
    displayRecipeInfo(e.target.parentElement.id);
  }
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

const displayRecipeInfo = (id) => {
  console.log(id);
  // let recipeCardHTML = "";
  let currentRecipe = recipesList.recipes.find((recipe) => {
    console.log(recipe.id, id);
    return `${recipe.id}` === id;
  });
  console.log(currentRecipe);
};




// When user clicks on a recipe thumbnail, it should take the user to the recipe's 'card'
// Will probably have to use event.target and the recipe's ID to display the right card
// Can display information in a similar way by altering the innerHTML
// Will have to toggle the main recipe page to hidden, and the card page to not hidden
// Will have to edit css styling for card

// two ways to see all recipes- when the page loads (landing page) and when the user clicks the all recipes button in the nav bar.
