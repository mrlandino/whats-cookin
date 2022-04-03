  let usersPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
  .then(usersResponse => usersResponse.json())
  .catch(err => console.log(error));

  let ingredientsPromise = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then(ingredientsResponse => ingredientsResponse.json())
  .catch(err => console.log(error));

  let recipePromise = fetch("	https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then(recipeResponse => recipeResponse.json())
  .catch(err => console.log(error));


export {usersPromise, ingredientsPromise, recipePromise};
