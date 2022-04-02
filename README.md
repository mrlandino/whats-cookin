# What's Cookin

<img width="500" alt="What's Cookin Homepage" src="">

## Table of Contents

  - [Introduction](#introduction)
  - [Deploy Link](#deploy-link)
  - [Technologies](#technologies)
  - [Features](#features)
  - [Page Demo](#page-demo)
  - [Possible Future Extensions](#possible-future-extensions)
  - [Set Up](#set-up)
  - [Contributors](#contributors)
  - [Project Specs](#project-specs)
  - [Project GitHub Repo](#project-github-repo)

## Introduction
The What's Cookin project was a group assignment for Turing School of Software and Design's Front End Module 2. Students were instructed to work in groups of three, with a time frame of 10 days to make a recipe tracking app with a minimum functionality laid out in the rubric. A user on the site is able to view a repository of recipes, favoriting and unfavoriting them as they like, as well as adding them to a list of recipes they intend to cook during a given week.

The goals for students while completing this project, included incorporating Fetch calls and interaction with a backend API for the first time. They were also expected to write test files for each of their classes and the methods within those classes - getting more comfortable with Mocha and Chai in the process.

The biggest wins for our group were __ .

## Deploy Link
The deploy link for the project can be found [here](https://whiteheadol.github.io/whats-cookin/).

## Technologies
  - Javascript
  - HTML
  - CSS
  - Mocha
  - Chai
  - Fetch API
  - Webpack
  - Node (?)

## Features
- When a user loads the browser, they should see a home page with a navigation bar and a display of different recipe thumbnails.
- They are able to view more information about a specific recipe by clicking on that recipe's image.
  - A recipe 'card' will load with the same image as well as ingredients, total recipe cost, and instructions. From here, they can decide to add the recipe to the list of recipes they'd like to cook, or they can return to the home page or favorite recipe page.
- While on the home page, a user can also click a recipe's star to add or remove that recipe from their 'favorites'.
- To refine their recipe search, a user can also use the **Filter Recipes** or **Search Recipes** buttons. This will allow them to search by a keyword or specific recipe tag within all of the recipes.
- To view all of their favorites, a user can then click on the **Favorite Recipes** button.
  - While on this page, they can then filter and search just their favorite recipes.
- Clicking on **All Recipes** will take the user back to a list of all the available recipes.  

## Page Demo
Adding a recipe to your favorites:

![Favoriting a recipe]()

Filtering through a recipe database:

![Filtering through recipes]()

## Possible Future Extensions
- At the moment, a user is instantiated from an array of user objects, and the information for these user objects is pulled from a database. We would love to add functionality for a site visiter to actually provide their information and instantiate their own user object.
- We would also love to add the ability for a user to rate the recipes they've cooked or to leave notes for themselves about the recipe.
- Users are only able to filter by one tag at a time, but we hope to update this in the future so that they can filter by multiple tags at once.

## Set Up
1. Fork and clone this repo.
2. Read this README thoroughly.
3. Type `cd whats_cookin` to move into the root directory.
4. run `npm install` to install neccessary dependencies.
5. Run `npm start`.
6. Copy the url given by running `npm start` and open in your browser.
7. Enjoy exploring the recipe database.

## Contributors
- Stephanie Roe (GitHub: stephanie-roe)
- Ross Landino (GitHub: mrlandino)
- Olivia Whitehead (GitHub: whiteheadol)

## Project Specs
- The spec for this project can be found [here](https://frontend.turing.edu/projects/What%27sCookin-PartOne.html).

## Project GitHub Repo
- The project repo can be found [here](https://github.com/whiteheadol/whats-cookin).
