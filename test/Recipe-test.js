import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
  let recipe, recipeData, ingredients;

  beforeEach(() => {
    recipeData = [
      {
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        },
        {
          "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
          "number": 4
        },
        {
          "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
          "number": 5
        },
        {
          "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
          "number": 6
        }
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
      }
    ]
    recipe = new Recipe(recipeData[0]);
    ingredients = [
        {
          "id": 20081,
          "name": "wheat flour",
          "estimatedCostInCents": 142
        },
        {
          "id": 18372,
          "name": "bicarbonate of soda",
          "estimatedCostInCents": 582
        },
        {
          "id": 1123,
          "name": "eggs",
          "estimatedCostInCents": 472
        } ];
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should be an instance of RecipeRepository', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('Should store recipe details', () => {
    expect(recipe.id).to.deep.equal(recipeData[0].id);
    expect(recipe.image).to.deep.equal(recipeData[0].image);
    expect(recipe.ingredients).to.deep.equal(recipeData[0].ingredients);
    expect(recipe.instructions).to.deep.equal(recipeData[0].instructions);
    expect(recipe.name).to.deep.equal(recipeData[0].name);
    expect(recipe.tags).to.deep.equal(recipeData[0].tags);
  });

  it('Should have a method that will store a list of ingredients needed', () => {
    recipe.findIngredientsNeeded(ingredients);
    expect(recipe.ingredientsNeeded.length).to.equal(3);
    expect(recipe.ingredientsNeeded[0].name).to.equal("wheat flour");
    expect(recipe.ingredientsNeeded[0].amount).to.equal(1.5);

  });

  it('Should have a method that will determine the cost of the recipe', () => {
    recipe.getCost(ingredients);
    expect(recipe.recipeCost).to.equal(9.76);
  });

  it('Should have a method that will return the recipe instructions', () => {
    let instructions = recipe.getInstructions();
    expect(instructions).to.equal(recipeData[0].instructions);
  });
})
