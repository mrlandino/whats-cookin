let errorMessage = document.querySelector(".error-message");
let userUrl = 'http://localhost:3001/api/v1/users';

let getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => console.log(error));
};

let usersPromise = getPromise("http://localhost:3001/api/v1/users");
let ingredientsPromise = getPromise("http://localhost:3001/api/v1/ingredients");
let recipePromise = getPromise("http://localhost:3001/api/v1/recipes");

let postIngredient = (postObject) => {
  fetch(userUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postObject)
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((ingredient) => {
    errorMessage.innerText = '';
    console.log("Sweet, your ingredients have been updated");
  })
  .catch((error) => {
    console.log("ERROR");
    errorMessage.innerText = 'Your ingredient was not added successfully';
    return errorMessage;
  });
};


export {usersPromise, ingredientsPromise, recipePromise, postIngredient};
