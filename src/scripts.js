import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import recipeData from './data/recipes.js'
import RecipeRepository from './classes/RecipeRepository.js'



// VARIABLES-----------------------------------------------
const allRecipes = document.querySelector(".all-recipe-thumbnails")
// const recipeTest = [{name: "steph", age: 24}, {name: "olivia", age: 26}]
recipeData;
const recipesList = new RecipeRepository(recipeData)
// EVENT LISTENERS-----------------------------------------------
// window.onLoad('load', displayAllRecipes);

window.onload = (event) => {
  console.log(recipesList)
  displayAllRecipes()
};
// EVENT HANDLERS------------------------------------------------

const displayAllRecipes = () => {
  // console.log("pls work")
  let allRecipesHTML = "";
  recipesList.recipes.forEach((recipe) => {
    allRecipesHTML += `<div class="recipe-thumbnail">
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
                </div>
              </div>`
  })
  //iterator in here to run thru recipes , within that iterator we inject the html with the corresponding info for
  //recipes += html string
  //this.container.innerHtml = variable you set up
  allRecipes.innerHTML = allRecipesHTML;
}

// two ways to see all recipes- when the page loads (landing page) and when the user clicks the all recipes button in the nav bar.
