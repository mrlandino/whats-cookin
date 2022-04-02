import './styles.css';
import './scripts.js';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
// import recipeData from './data/recipes.js';
// import ingredientsData from './data/ingredients.js';
// import usersData from './data/users.js';
import RecipeRepository from './classes/RecipeRepository.js';
import Recipe from './classes/Recipe.js';
import User from './classes/User.js';

// let usersData;
// let ingredientsData;
// let recipeData;
// let recipesList;
//
// const apiCalls = () => {
//   let usersPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
//       .then(usersResponse => usersResponse.json());
//   let ingredientsPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
//       .then(ingredientsResponse => ingredientsResponse.json());
//   let recipePromise = fetch("	https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
//       .then(recipeResponse => recipeResponse.json());
//   Promise.all(
//     [
//       usersPromise,
//       ingredientsPromise,
//       recipePromise
//     ]
//   ).then(jsonArray => {
//     usersData = jsonArray[0].usersData;
//     ingredientsData = jsonArray[1].ingredientsData;
//     recipeData = jsonArray[2].recipeData;
//     recipesList = new RecipeRepository(recipeData);
//     instantiateUser();
//     displayAllRecipes();
//     injectFilterTags();
//     recipesList.updateRecipesList();
//   })
// }
//
// export default apiCalls;
