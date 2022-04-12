  let usersPromise = fetch("http://localhost:3001/api/v1/users")
  .then(usersResponse => usersResponse.json())
  .catch(err => console.log(error));

  let ingredientsPromise = fetch("http://localhost:3001/api/v1/ingredients")
  .then(ingredientsResponse => ingredientsResponse.json())
  .catch(err => console.log(error));

  let recipePromise = fetch("http://localhost:3001/api/v1/recipes")
  .then(recipeResponse => recipeResponse.json())
  .catch(err => console.log(error));


// Put urls into array?
// forEach on them for the then and catch?

// let urlsArray = []

export {usersPromise, ingredientsPromise, recipePromise};
