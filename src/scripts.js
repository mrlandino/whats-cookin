import "./styles.css";
import {usersPromise, ingredientsPromise, recipePromise, postIngredient} from "./apiCalls";
import "./images/favorite-star.png";
import "./images/empty-star.png";
import "./images/check-mark.png";
import "./images/shopping-cart.png";
import RecipeRepository from "./classes/RecipeRepository.js";
import Recipe from "./classes/Recipe.js";
import User from "./classes/User.js";
import Pantry from "./classes/Pantry.js";

// VARIABLES-----------------------------------------------
let usersData;
let ingredientsData;
let recipeData;
let currentRecipe;
let currentUser;
let currentPantry;
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
const favRecipes= document.querySelector(".favorite-recipes-container");
const allRecipesTitle = document.querySelector(".all-recipes-title");
const favDropdownContent = document.querySelector(".dropdown-content-fav-tag");
const favRecipesTitle = document.querySelector(".fav-recipes-title");
const thumbnailAside = document.querySelector(".thumbnail-aside-container")
const favSearchInput = document.querySelector(".fav-search-button-input");
const clearFilters = document.querySelector(".clear-filters-button");
const addToMenuButton = document.querySelector(".add-to-menu");
const removeFromMenuButton = document.querySelector(".remove-from-menu");
const profileButton = document.querySelector(".profile-button");
const profileContainer = document.querySelector(".profile-container");
const itemizedPantry = document.querySelector(".itemized-pantry");
const pantryPage = document.querySelector(".pantry-page");
const menuThumbnails = document.querySelector(".menu-thumbnails");
const cookButton = document.querySelector("#cookRecipe");
const missingItems = document.querySelector(".missing-items");
const missingIngredients = document.querySelector(".missing-ingredients");
const addToPantryButton = document.querySelector(".add-to-pantry");
const pantryForm = document.querySelector(".add-to-panty-form");
const submitButton = document.querySelector(".submit-button")
// const pantryFormAside = document.querySelector(".pantry-form-container");
// const ingredientInput = document.querySelector("#select1");
const amountInput = document.querySelector('#amount');

// EVENT LISTENERS-----------------------------------------------
window.onload = (event) => loadWindow();

allRecipes.addEventListener("click", function(e) {
  if (e.target.parentElement.classList.contains("recipe-thumbnail")) {
    loadThumbnail(e);
  };
  if (e.target.classList.contains("star-icon")) {
    clickStar(e);
  };
});

// Duplicate code, talk to group about
allRecipes.addEventListener("keypress", function(e) {
  if (e.target.parentElement.classList.contains("recipe-thumbnail") && e.key === "Enter") {
    loadThumbnail(e);
  };
  if (e.target.classList.contains("star-icon") && e.key === "Enter") {
    clickStar(e);
  };
});

favoriteRecipesContainer.addEventListener("click", function(e) {
  if (e.target.parentElement.classList.contains("recipe-thumbnail")) {
    loadFavThumbnail(e);
  };
  if (e.target.classList.contains("star-icon")) {
    clickFavStar(e);
  };
});

// Duplicate code, talk to group about
favoriteRecipesContainer.addEventListener("keypress", function(e) {
  if (e.target.parentElement.classList.contains("recipe-thumbnail") && e.key === "Enter") {
    loadFavThumbnail(e);
  };
  if (e.target.classList.contains("star-icon") && e.key === "Enter") {
    clickFavStar(e);
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
  if(e.target.classList.contains("tag-hover")) {
    loadDropdown(e);
  };
});

// How can we make the dropdown accessible with just keys? Both all recipes & favs

favDropdownContent.addEventListener("click", function(e) {
  if(e.target.classList.contains("tag-hover")) {
    loadFavDropdown(e);
  };
});

// Duplicate code
favDropdownContent.addEventListener("keypress", function(e) {
  if(e.target.classList.contains("tag-hover") && e.key === "Enter") {
    loadFavDropdown(e);
  };
});

searchInput.addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    loadSearch(e);
  };
});

favoriteRecipesButton.addEventListener("click", function() {
  loadFavPage();
});

allRecipesButton.addEventListener("click", function() {
  loadAllPage();
});

profileButton.addEventListener("click", function() {
  displayUserProfile();
  hideElement([pantryForm, submitButton])
  disablePantryButton();
});

favSearchInput.addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    loadFavSearch(e);
  };
});

clearFilters.addEventListener("click", function() {
  loadFilterClear();
});

//need an eventListener to allow the user to click on the recipes in the menu
//need to method that injects the html to show the recipe details
menuThumbnails.addEventListener("click", function(e) {
  if (e.target.parentElement.classList.contains("recipe-thumbnail")) {
      loadMenuThumbnail(e);
      showElement([missingIngredients])
      toggleCookButton()
  };
});

// Duplicate code, talk to group about
menuThumbnails.addEventListener("keypress", function(e) {
  if (e.target.parentElement.classList.contains("recipe-thumbnail") && e.key === "Enter") {
      loadMenuThumbnail(e);
      showElement([missingIngredients])
      toggleCookButton()
  };
});

cookButton.addEventListener("click", function(e) {
  currentPantry.removeIngredients(currentRecipe)
  toggleCookButton()
  setTimeout(() => {displayUserProfile()}, 500);
});

addToPantryButton.addEventListener("click", function(e) {
  // disablePantryButton();
  injectForm(ingredientsData);
  disablePantryButton();
  showElement([pantryForm]);
});


submitButton.addEventListener("click", function(e) {
  postIngredient(postToPantry());
  currentPantry.addIngredients(getId(), getName(), getAmount());
  pantryForm.reset();
  displayUserProfile();
  hideElement([pantryForm, submitButton]);
  disablePantryButton();
});


// EVENT HANDLERS------------------------------------------------
const loadWindow = () => {
  Promise.all(
    [
      usersPromise,
      ingredientsPromise,
      recipePromise
    ]
  ).then(jsonArray => {
    usersData = jsonArray[0];
    ingredientsData = jsonArray[1];
    recipeData = jsonArray[2];
    recipesList = new RecipeRepository(recipeData);
    instantiateUser();
    recipesList.updateRecipesList();
    displayAllRecipes();
    injectFilterTags();
  })
};

const loadThumbnail = (e) => {
  displayCard();
  findRecipeInfo(e.target.parentElement.id);
  updateRecipeCard();
  hideElement([aside, allSearchBar, allFilter, allRecipesTitle]);
  showElement([allRecipesButton]);
  menuButtonStatus();
};

const clickStar = (e) => {
  addRecipeToFavorites(e.target.id);
  changeStar(e.target);
};

const loadFavThumbnail = (e) => {
  displayCard();
  findRecipeInfo(e.target.parentElement.id);
  updateRecipeCard();
  hideElement([aside, favoriteRecipesContainer]);
  showElement([favoriteRecipesButton]);
  menuButtonStatus();
};

const loadMenuThumbnail = (e) => {
  displayCard();
  findRecipeInfo(e.target.parentElement.id);
  updateRecipeCard();
  hideElement([aside, favoriteRecipesContainer, pantryPage, missingIngredients]);
  showElement([favoriteRecipesButton, profileButton]);
  menuButtonStatus();
  displayMissingIngredients();

}

const clickFavStar = (e) => {
  changeStar(e.target);
  addRecipeToFavorites(e.target.id);
  displayFavoriteRecipes();
};

const loadDropdown = (e) => {
  applyFilter(e.target.dataset.id);
  displayFilteredContent();
  hideElement([aside, allSearchBar, allFilter, allRecipesTitle, addToMenuButton, removeFromMenuButton]);
  showElement([allRecipesButton]);
};

const loadFavDropdown = (e) => {
  applyFavFilter(e.target.dataset.fav);
  favRecipes.innerHTML = "";
  displayFilteredFavs();
};

const loadSearch = (e) => {
  event.preventDefault();
  applySearch(`${searchInput.value}`);
  displaySearchedContent();
  hideElement([aside, allSearchBar, allFilter, allRecipesTitle, addToMenuButton, removeFromMenuButton, missingIngredients]);
  showElement([allRecipesButton]);
};

const loadFavSearch = (e) => {
  event.preventDefault();
  applyFavSearch(`${favSearchInput.value}`);
  displayFavSearchedContent();
};

const loadFavPage = () => {
  hideElement([allRecipesContainer, favoriteRecipesButton, allSearchBar, allFilter, recipeDetailsContainer, addToMenuButton, removeFromMenuButton, pantryPage, missingIngredients]);
  showElement([favoriteRecipesContainer, allRecipesButton, profileButton]);
  displayFavoriteRecipes();
  showElement([aside]);
};

const loadAllPage = () => {
  showElement([favoriteRecipesButton, allSearchBar, allFilter, allRecipesContainer, allRecipesTitle, profileButton]);
  hideElement([allRecipesButton, favoriteRecipesContainer, recipeDetailsContainer, aside, addToMenuButton, removeFromMenuButton, pantryPage, missingIngredients]);
  displayAllRecipes();
  currentUser.favoritesByTag = [];
  currentUser.favoritesByName = [];
};

const loadFilterClear = () => {
  currentUser.favoritesByTag = [];
  currentUser.favoritesByName = [];
  displayFavoriteRecipes();
};

const showElement = elements => {
  elements.forEach(element => element.classList.remove("hidden"));
};

const hideElement = elements => {
  elements.forEach(element => element.classList.add("hidden"));
};

const displayAllRecipes = () => {
  let allRecipesHTML = "";
  recipesList.recipes.forEach((recipe) => {
    allRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img tabindex="0" class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details" id=${recipe.id}>
                  <p>${recipe.name}</p>
                  <img tabindex="0" class="star-icon" id='${recipe.id}' src=${findImageSource(recipe)} alt=${findImageAlt(recipe)}>
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
                <img tabindex="0" class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details" id=${recipe.id}>
                  <p>${recipe.name}</p>
                  <img tabindex="0" class="star-icon" id='${recipe.id}' src="./images/favorite-star.png" alt="favorited">
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
    filteredRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img tabindex="0" class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img tabindex="0" class="star-icon" id=${recipe.id} src=${findImageSource(recipe)} alt=${findImageAlt(recipe)}>
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
                <img tabindex="0" class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img tabindex="0" class="star-icon" id=${recipe.id} src=${findImageSource(recipe)} alt=${findImageAlt(recipe)}>
                </div>
              </div>`;
  });
  allRecipes.innerHTML = searchedRecipesHTML;
};

const instantiateUser = () => {
  let randomUser = usersData[Math.floor(Math.random() * usersData.length)];
  currentUser = new User(randomUser);
  currentPantry = new Pantry(currentUser);
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
  if (target.src === "http://localhost:8080/images/empty-star.png") {
    target.src = "http://localhost:8080/images/favorite-star.png";
    target.alt = "favorited";
  } else {
    target.src = "http://localhost:8080/images/empty-star.png";
    target.alt = "unfavorited";
  };
};

const displayFilteredFavs = () => {
  favRecipes.innerHTML = "";
  let title = `<div class="fav-recipe-title">
                <h2>Favorite Recipes</h2>
                  </div>`;
  let filteredRecipesHTML = "";
    currentUser.favoritesByTag.forEach((recipe) => {
    filteredRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img tabindex="0" class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img tabindex="0" class="star-icon" id=${recipe.id} src=${findImageSource(recipe)} alt=${findImageAlt(recipe)}>
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
    favSearchedRecipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img tabindex="0" class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details">
                  <p>${recipe.name}</p>
                  <img tabindex="0" class="star-icon" id=${recipe.id} src=${findImageSource(recipe)} alt=${findImageAlt(recipe)}>
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

const findImageSource = (recipe) => {
  let imageSource = "";
  if(recipe.isFavorite) {
    imageSource = "http://localhost:8080/images/favorite-star.png";
  } else {
    imageSource = "http://localhost:8080/images/empty-star.png";
  };
  return imageSource;
};

const findImageAlt = (recipe) => {
  let altText = "";
  if(recipe.isFavorite) {
    altText = "favorited";
  } else {
    altText = "unfavorited";
  };
  return altText;
}

const displayUserProfile = () => {
  hideElement([profileButton, allRecipesContainer, allSearchBar, allFilter, favRecipes, aside, recipeDetailsContainer, missingIngredients, addToMenuButton, removeFromMenuButton]);
  showElement([allRecipesButton, favoriteRecipesButton, pantryPage]);
  if (!currentPantry.currentPantry.length) {
    currentPantry.updateCurrentPantry(ingredientsData);
  } else {
    currentPantry.repopulateCurrentPantry(ingredientsData);
  }
  displayPantry();
  checkCookability();
  displayMenuRecipes();
  disablePantryButton();
};

const displayPantry = () => {
  let pantryList = "";
  let pantryItems;

  // itemizedPantry.innerHTML = "";

  pantryItems = currentPantry.currentPantry.reduce((allItems, item) => {
    allItems.push(item)
    return allItems;
  }, []);

  pantryItems.forEach(item => {
    pantryList += `<p class="pantry-item" data-id="${item.name}">${item.name} X ${item.amount}</p>`
  });

  itemizedPantry.innerHTML = pantryList;
};

const displayMenuRecipes = () => {
  menuThumbnails.innerHTML = "";
  let recipesHTML = "";

  currentUser.recipesToCook.forEach((recipe) => {
    recipesHTML += `<div class="recipe-thumbnail" id=${recipe.id}>
                <img tabindex="0" class="recipe-image" src=${recipe.image} alt=${recipe.name}>
                <div class="thumbnail-details" id=${recipe.id}>
                  <p>${recipe.name}</p>
                  <img class="menu-icon" id='${recipe.id}' src=${findCookableSource(recipe)} alt=${findCookableAlt(recipe)}>
                </div>
              </div>`;
  });
  let title = `<div class="menu-recipe-title"><h2>Menu</h2></div>`
  menuThumbnails.innerHTML = title + recipesHTML;
};

const checkCookability = () => {
  currentUser.recipesToCook.forEach(recipe => {
    currentPantry.assessIngredients(recipe);
  });
};

const findCookableSource = (recipe) => {
  let imageSource = "";
  if(recipe.canBeCooked) {
    imageSource = "http://localhost:8080/images/check-mark.png"
  } else {
    imageSource = "http://localhost:8080/images/shopping-cart.png"
  }
  return imageSource;
};

const findCookableAlt = (recipe) => {
  let imageAlt = "";
  if(recipe.canBeCooked) {
    imageAlt = "cookable"
  } else {
    imageAlt = "uncookable"
  }
  return imageAlt;
};

const displayMissingIngredients = () => {
  currentPantry.updateMissingIngredients(ingredientsData);
  canCookToggle();

  let missingIngredientList = "";
  let missing;

  missing = currentPantry.ingredientsMissing.reduce((allItems, item) => {
    allItems.push(item)
    return allItems;
  }, []);

  missing.forEach(item => {
    missingIngredientList += `<p class="missing-item" data-id="${item.name}">${item.name} X ${item.amount}</p>`
  });
  missingItems.innerHTML = missingIngredientList;
};

const canCookToggle = () => {
  if(currentPantry.ingredientsMissing.length > 0) {
    cookButton.disabled = false;
    cookButton.classList.remove("disabled")
  } else {
    cookButton.disabled = false;
    cookButton.classList.remove("disabled")
  };
};

const disablePantryButton = () => {
  if (submitButton.classList.contains("hidden")) {
    addToPantryButton.disabled = false;
  } else {
    addToPantryButton.disabled = true;
  }
};

const toggleCookButton = () => {
  if (cookButton.innerText === "Cook Recipe") {
    cookButton.innerText = "Recipe Cooked!"
  } else {
    cookButton.innerText = "Cook Recipe"
  }
};

const injectForm = (ingredientsData) => {
  pantryForm.innerHTML = ""
  // const ingredientNames = ingredientsData.map((ingredient) => {
  //   return ingredient.name.toLowerCase()
  // })
  // ingredientNames.sort()

  let options;
  let label = `<label class="form-label" for="ingredient-dropdown">Choose an Ingredient to Add:</label>`
  let selectOpen = `<select id="select1" class="ingredient-selection" required`;
  let selectClose = `</select>`
  let placeholder = `<option value selected>Select Ingredient</option>`
  let numInput = `<label class="form-label" for="amount">Select a Quantity:</label>
                  <input type="number" id ="amount" name="amount" step="0.25" min="0.25" max="100" required>`

  ingredientsData.forEach(item => {
    item.name = item.name.toLowerCase();
  });

  ingredientsData.sort((a, b) => {
    let nameA = a.name;
    let nameB = b.name;

    if (nameA < nameB) {
      return -1;
    } if (nameA > nameB) {
      return 1;
    }
    return 0
  });

  ingredientsData.forEach((ingredient) => {
    options += `<option data-id=${ingredient.id} value=${ingredient.name.replaceAll(" ", "")}>${ingredient.name}</option>`
  });

  pantryForm.innerHTML += label + selectOpen + placeholder + options + selectClose + numInput;
  showElement([submitButton]);
};

// Function to invoke pantry method
// Pull values from form

const getName = () => {
  let ingredientInput = document.querySelector("#select1");
  let output = ingredientInput.value;
  return output;
};

const getId = () => {
  let ingredientInput = document.querySelector("#select1");
  let output = ingredientInput.value;
  let result;
  ingredientsData.forEach(ingredient => {
    ingredient.name.toLowerCase();
    if (ingredient.name.replaceAll(" ", "") === output) {
      result = ingredient.id;
    }
  })
  return result;
};

const getAmount = () => {
  let ingredientAmount = document.querySelector("#amount");
  let output = ingredientAmount.value;
  console.log("AMOUNT", output);
  return output;
}

const postToPantry = () => {
  let ingredientAmount = getAmount();
  let ingredientName = getName();
  let ingredientId = getId();

  return { userID: currentUser.id, ingredientID: ingredientId, ingredientModification: ingredientAmount }
}
