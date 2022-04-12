let getPromise = (url) => {
  return fetch(url)
  .then(usersResponse => usersResponse.json())
  .catch(err => console.log(error));
};

let usersPromise = getPromise("http://localhost:3001/api/v1/users");
let ingredientsPromise = getPromise("http://localhost:3001/api/v1/ingredients");
let recipePromise = getPromise("http://localhost:3001/api/v1/recipes");

export {usersPromise, ingredientsPromise, recipePromise};
