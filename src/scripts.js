import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
// import recipeData from './data/recipes.js';
// import ingredientsData from './data/ingredients.js';
// import usersData from './data/users.js';
import RecipeRepository from './classes/RecipeRepository.js';
import Recipe from './classes/Recipe.js';
import User from './classes/User.js';

// VARIABLES-----------------------------------------------
let usersData;
let ingredientsData;
let recipeData;
let currentRecipe;
let currentUser;
let recipesList;
let favoriteRecipes;
const allRecipes = document.querySelector(".all-recipe-thumbnails");
const allRecipesContainer = document.querySelector(".all-recipes-container");
const recipeDetailsContainer = document.querySelector(".recipe-details-container");
const filterByTag = document.querySelector(".filter-tag-button");
const dropdownContent = document.querySelector(".dropdown-content");
const searchInput = document.querySelector(".search-button-input");
const largeStar = document.querySelector(".large-star");
const favoriteRecipesButton = document.querySelector(".favorite-recipes-button");
const favoriteRecipesContainer = document.querySelector(".favorite-recipes-container");
const allSearchBar = document.querySelector(".all-search-bar");
const allFilter = document.querySelector(".dropdown");
const allRecipesButton = document.querySelector(".all-recipes-button");
const aside = document.querySelector(".fav-filter-search-bar")
let favRecipes= document.querySelector(".favorite-recipes-container");

let favDropdownContent = document.querySelector(".dropdown-content-fav-tag");

// EVENT LISTENERS-----------------------------------------------
window.onload = (event) => {
  //apiCalls();
  let usersPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
      .then(usersResponse => usersResponse.json());
  let ingredientsPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
      .then(ingredientsResponse => ingredientsResponse.json());
  let recipePromise = fetch("	https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
      .then(recipeResponse => recipeResponse.json());
  Promise.all(
    [
      usersPromise,
      ingredientsPromise,
      recipePromise
    ]
  ).then(jsonArray => {
    usersData = jsonArray[0].usersData;
    ingredientsData = jsonArray[1].ingredientsData;
    recipeData = jsonArray[2].recipeData;
    recipesList = new RecipeRepository(recipeData);
    instantiateUser();
    displayAllRecipes();
    injectFilterTags();
    recipesList.updateRecipesList();
    hideElement([aside])

  })
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

favoriteRecipesContainer.addEventListener("click", function(e) {
  if (e.target.classList.contains('star-icon')) {
    changeStar(e.target);
    addRecipeToFavorites(e.target.parentElement.id);
    displayFavoriteRecipes();
    // injectFavFilterTags();
  };
});

dropdownContent.addEventListener("click", function(e) {
  if(e.target.classList.contains('tag-hover')) {
    applyFilter(e.target.dataset.id);
    displayFilteredContent();
    hideElement([aside])
  };
});

favDropdownContent.addEventListener("click", function(e) {
  if(e.target.classList.contains('tag-hover')) {
    console.log(e.target.dataset.fav)
    applyFavFilter(e.target.dataset.fav);
    favRecipes.innerHTML = "";
    displayFilteredFavs();
  };
});

searchInput.addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    event.preventDefault();
    applySearch(`${searchInput.value}`);
    displaySearchedContent();
  };
});

favoriteRecipesButton.addEventListener("click", function() {
  hideElement([allRecipesContainer, favoriteRecipesButton, allSearchBar, allFilter]);
  showElement([favoriteRecipesContainer, allRecipesButton]);
  // favoriteRecipes = new RecipeRepository(currentUser.favoriteRecipes)
  displayFavoriteRecipes();
  // injectFavFilterTags();
})

allRecipesButton.addEventListener("click", function() {
  showElement([favoriteRecipesButton, allSearchBar, allFilter, allRecipesContainer]);
  hideElement([allRecipesButton, favoriteRecipesContainer]);
  displayAllRecipes();
})

// EVENT HANDLERS------------------------------------------------
const showElement = elements => {
  elements.forEach(element => element.classList.remove('hidden'));
};

const hideElement = elements => {
  elements.forEach(element => element.classList.add('hidden'));
};

const displayAllRecipes = () => {
  let allRecipesHTML = "";

  recipesList.recipes.forEach((recipe, index) => {
    let imageSource = "";
    if(recipe.isFavorite) {
      imageSource = "https://cdn-icons-png.flaticon.com/512/1040/1040230.png";
    } else {
      imageSource = "https://cdn-icons-png.flaticon.com/512/1828/1828970.png";
    };

    allRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details" id=${recipe.id}>
                  <p>${recipe.name}</p>
                  <img class="star-icon" data-index='${recipe.id}' src=${imageSource}>
                </div>
              </div>`;
  });
  allRecipes.innerHTML = allRecipesHTML;
};

const displayFavoriteRecipes = () => {
  favoriteRecipesContainer.innerHTML = "";
  let favRecipesHTML = "";
  currentUser.favoriteRecipes.forEach((recipe, index) => {
    favRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details" id=${recipe.id}>
                  <p>${recipe.name}</p>
                  <img class="star-icon" data-index='${index}' src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  // let asideHTML = `<aside class="fav-filter-search-bar">
  //                   <h3>Refine Favorite Recipes</h3>
  //                   <form class="fav-search-bar">
  //                     <label class="fav-search-button-label" for="fav-recipe-search">Search:</label>
  //                     <input class="fav-search-button-input" type="search" id="fav-recipe-search">
  //                   </form>
  //                   <div class="dropdown-fav-tag">
  //                     <button class="fav-filter-tag">Filter</button>
  //                   <div class="dropdown-content-fav-tag" ></div>
  //                 </div>
  //               </aside>`;

  let title = `<h2>Favorite Recipes</h2>`
  favoriteRecipesContainer.innerHTML = title + favRecipesHTML;
};


const displayCard = () => {
  hideElement([allRecipesContainer]);
  showElement([recipeDetailsContainer]);
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
  recipe += `<div class="recipe-card">
              <div class="recipe-title">
              <h2>${currentRecipe.name}</h2>
              <img class="large-star hidden" src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
            </div>
            <div class="image-and-ingredients-container">
              <img class="recipe-card-image" src=${currentRecipe.image} alt=${currentRecipe.name}>
              <div class="ingredients-container">
                <h3>Ingredients:</h3>
                <div class="ingredient-list-name-and-amounts">`;

  let ingredientList = "";
  currentRecipe.ingredientsNeeded.forEach(ingredient => {
    ingredientList += `<p>${ingredient.name} ${ingredient.amount} ${ingredient.unit}</p>`;
  });
  let recipeCost = "";
  recipeCost += `<p class="price">$${currentRecipe.recipeCost}</p>`;
  let instructionsList = "";
  currentRecipe.instructions.forEach(instruction => {
    instructionsList += `<p class="instructions">${instruction.number}. ${instruction.instruction}</p>`;
  });

  recipeDetailsContainer.innerHTML = (recipe + ingredientList + recipeCost + `</div></div></div><div class="recipe-instructions"><h3>Instructions:</h3>` + instructionsList + `</div></div>`);
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


// const injectFavFilterTags = () => {
//   console.log("it works");
//
//   // let favDropdownContent = document.querySelector(".dropdown-content-fav-tag");
//   let favTags = "";
//   let uniqueFavTags;
//   // console.log(currentUser.favoriteRecipes)
//   uniqueFavTags = currentUser.favoriteRecipes.reduce((allTags, recipe) => {
//     recipe.tags.forEach(tag => {
//       if (!allTags.includes(tag)) {
//         allTags.push(tag);
//       };
//     });
//     return allTags;
//   }, []);
// console.log(uniqueFavTags)
//   uniqueFavTags.forEach((tag) => {
//     favTags += `<p class="tag-hover" data-id="${tag}">${tag}</p>`
//   });
//   console.log(favTags);
//   favDropdownContent.innerHTML = favTags;
// };

const applyFilter = (id) => {
  recipesList.filterByTag(id);
};

const applyFavFilter = (id) => {
  // console.log(favoriteRecipes.filteredRecipesTag)
  currentUser.filterFavoriteByTag(id);
  // console.log(favoriteRecipes.filteredRecipesTag)
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
  console.log(usersData);
  let randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  console.log(randomUser);
  currentUser = new User(randomUser);
};

const addRecipeToFavorites = (id) => {
  let recipeClicked = recipesList.recipes.find(recipe => `${recipe.id}` === id);

  if (!recipeClicked.isFavorite) {
    recipeClicked.isFavorite = true;
    currentUser.addFavoriteRecipes(recipeClicked);
  } else {
    recipeClicked.isFavorite = false;
    currentUser.removeFavoriteRecipes(recipeClicked);
  };
};

const changeStar = (target) => {
  if (target.src === "https://cdn-icons-png.flaticon.com/512/1828/1828970.png") {
    target.src = "https://cdn-icons-png.flaticon.com/512/1040/1040230.png";
  } else {
    target.src = "https://cdn-icons-png.flaticon.com/512/1828/1828970.png";
  };
};

const displayFilteredFavs = () => {
  // console.log(currentUser)
  console.log(favRecipes.innerHTML)
  favRecipes.innerHTML = "";
  let title = "<h2>Favorite Recipes</h2>";
  let filteredRecipesHTML = "";
    currentUser.favoritesByTag.forEach((recipe) => {
    filteredRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" id=${recipe.id} src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  console.log(filteredRecipesHTML);
  favRecipes.innerHTML = title + filteredRecipesHTML;
}
