import './styles.css';
import {usersPromise, ingredientsPromise, recipePromise} from './apiCalls';
import './images/turing-logo.png';
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
const aside = document.querySelector(".fav-filter-search-bar");
let favRecipes= document.querySelector(".favorite-recipes-container");
let allRecipesTitle = document.querySelector(".all-recipes-title");
let favDropdownContent = document.querySelector(".dropdown-content-fav-tag");
const favRecipesTitle = document.querySelector(".fav-recipes-title");
const thumbnailAside = document.querySelector(".thumbnail-aside-container")
const favSearchInput = document.querySelector(".fav-search-button-input");
const clearFilters = document.querySelector(".clear-filters-button");
const addToMenuButton = document.querySelector(".add-to-menu");
const removeFromMenuButton = document.querySelector(".remove-from-menu");

// EVENT LISTENERS-----------------------------------------------
window.onload = (event) => {
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
  });
};

allRecipes.addEventListener('click', function(e) {
  if (e.target.parentElement.classList.contains('recipe-thumbnail')) {
    displayCard();
    findRecipeInfo(e.target.parentElement.id);
    updateRecipeCard();
    hideElement([aside, allSearchBar, allFilter, allRecipesTitle]);
    showElement([allRecipesButton]);
    menuButtonStatus();
  };
});

favoriteRecipesContainer.addEventListener("click", function(e) {
  if (e.target.parentElement.classList.contains('recipe-thumbnail')) {
    displayCard();
    findRecipeInfo(e.target.parentElement.id);
    updateRecipeCard();
    hideElement([aside, favoriteRecipesContainer]);
    showElement([favoriteRecipesButton]);
    menuButtonStatus();
  };
});

allRecipes.addEventListener("click", function(e) {
  if (e.target.classList.contains('star-icon')) {
    addRecipeToFavorites(e.target.id);
    changeStar(e.target);
  };
});

favoriteRecipesContainer.addEventListener("click", function(e) {
  if (e.target.classList.contains('star-icon')) {
    changeStar(e.target);
    addRecipeToFavorites(e.target.id);
    displayFavoriteRecipes();
  };
});

addToMenuButton.addEventListener("click", function() {
  addToMenu(currentRecipe.id);
  menuButtonStatus();
});

removeFromMenuButton.addEventListener("click", function() {
  removeFromMenu(currentRecipe.id);
  menuButtonStatus();
});

dropdownContent.addEventListener("click", function(e) {
  if(e.target.classList.contains('tag-hover')) {
    applyFilter(e.target.dataset.id);
    displayFilteredContent();
    hideElement([aside, allSearchBar, allFilter, allRecipesTitle, addToMenuButton, removeFromMenuButton]);
    showElement([allRecipesButton]);
  };
});

favDropdownContent.addEventListener("click", function(e) {
  if(e.target.classList.contains('tag-hover')) {
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
    hideElement([aside, allSearchBar, allFilter, allRecipesTitle, addToMenuButton, removeFromMenuButton]);
    showElement([allRecipesButton]);
  };
});

favoriteRecipesButton.addEventListener("click", function() {
  hideElement([allRecipesContainer, favoriteRecipesButton, allSearchBar, allFilter, recipeDetailsContainer, addToMenuButton, removeFromMenuButton]);
  showElement([favoriteRecipesContainer, allRecipesButton]);
  displayFavoriteRecipes();
  showElement([aside]);
});

allRecipesButton.addEventListener("click", function() {
  showElement([favoriteRecipesButton, allSearchBar, allFilter, allRecipesContainer, allRecipesTitle]);
  hideElement([allRecipesButton, favoriteRecipesContainer, recipeDetailsContainer, aside, addToMenuButton, removeFromMenuButton]);
  displayAllRecipes();
  currentUser.favoritesByTag = [];
  currentUser.favoritesByName = [];
});

favSearchInput.addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    event.preventDefault();
    applyFavSearch(`${favSearchInput.value}`);
    displayFavSearchedContent();
  };
});

clearFilters.addEventListener("click", function() {
  currentUser.favoritesByTag = [];
  currentUser.favoritesByName = [];
  displayFavoriteRecipes();
});

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
                  <img class="star-icon" id='${recipe.id}' src=${imageSource}>
                </div>
              </div>`;
  });
  allRecipes.innerHTML = allRecipesHTML;
};

const displayFavoriteRecipes = () => {
  favoriteRecipesContainer.innerHTML = "";
  let favRecipesHTML = "";
  currentUser.favoriteRecipes.forEach((recipe) => {
    favRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details" id=${recipe.id}>
                  <p>${recipe.name}</p>
                  <img class="star-icon" id='${recipe.id}' src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  let title = `<div class="fav-recipe-title"><h2>Favorite Recipes</h2></div>`
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

const addToMenu = (id) => {
  let menuRecipe = recipesList.recipes.find((recipe) => {
    return recipe.id === id;
  });
  let recipeToAdd = currentUser.addRecipeToMenu(menuRecipe);
  return recipeToAdd;
};

const removeFromMenu = (id) => {
  let menuRecipe = recipesList.recipes.find((recipe) => {
    return recipe.id === id;
  });
  let recipeToRemove = currentUser.removeRecipeFromMenu(menuRecipe);
  return recipeToRemove;
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
  recipesList.filterByTag(id);
};

const applyFavFilter = (id) => {
  currentUser.filterFavoriteByTag(id);
};

const displayFilteredContent = () => {
  allRecipes.innerHTML = "";
  let filteredRecipesHTML = "";
  recipesList.filteredRecipesTag.forEach((recipe) => {
    let imageSource = "";
    if(recipe.isFavorite) {
      imageSource = "https://cdn-icons-png.flaticon.com/512/1040/1040230.png";
    } else {
      imageSource = "https://cdn-icons-png.flaticon.com/512/1828/1828970.png";
    };
    filteredRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" id=${recipe.id} src="${imageSource}" alt="favorite recipe icon">
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
    let imageSource = "";
    if(recipe.isFavorite) {
      imageSource = "https://cdn-icons-png.flaticon.com/512/1040/1040230.png";
    } else {
      imageSource = "https://cdn-icons-png.flaticon.com/512/1828/1828970.png";
    };
    searchedRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" id=${recipe.id} src="${imageSource}" alt="favorite recipe icon">
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
  favRecipes.innerHTML = "";
  let title = `<div class="fav-recipe-title">
                <h2>Favorite Recipes</h2>
                  </div>`;
  let filteredRecipesHTML = "";
    currentUser.favoritesByTag.forEach((recipe) => {
      let imageSource = "";
      if(recipe.isFavorite) {
        imageSource = "https://cdn-icons-png.flaticon.com/512/1040/1040230.png";
      } else {
        imageSource = "https://cdn-icons-png.flaticon.com/512/1828/1828970.png";
      };
    filteredRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" id=${recipe.id} src="${imageSource}" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  favRecipes.innerHTML = title + filteredRecipesHTML;
};

const applyFavSearch = (input) => {
  currentUser.filterFavoriteByName(input);
};

const displayFavSearchedContent = () => {
  favRecipes.innerHTML = "";
  let title = "<h2>Favorite Recipes</h2>";
  let favSearchedRecipesHTML = "";
  currentUser.favoritesByName.forEach((recipe) => {
    let imageSource = "";
    if(recipe.isFavorite) {
      imageSource = "https://cdn-icons-png.flaticon.com/512/1040/1040230.png";
    } else {
      imageSource = "https://cdn-icons-png.flaticon.com/512/1828/1828970.png";
    };
    favSearchedRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img class="star-icon" id=${recipe.id} src="${imageSource}" alt="favorite recipe icon">
                </div>
              </div>`;
  });
  favRecipes.innerHTML = title + favSearchedRecipesHTML;
};

const menuButtonStatus = () => {
  if (currentUser.recipesToCook.length > 0) {
    const update = currentUser.recipesToCook.find(recipe => {
      if (recipe.id === currentRecipe.id) {
        showElement([removeFromMenuButton]);
        hideElement([addToMenuButton]);
        return currentUser.recipesToCook;
      } else {
        hideElement([removeFromMenuButton]);
        showElement([addToMenuButton]);
      };
    });
  } else {
    hideElement([removeFromMenuButton]);
    showElement([addToMenuButton]);
  };
};
