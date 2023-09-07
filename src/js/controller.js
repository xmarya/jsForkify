import "core-js/stable";
import { async } from "regenerator-runtime";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarkView from "./views/bookmarkView.js";
import newRecipeView from "./views/newRecipeView.js";

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// related to parcel not JS.
// if(module.hot){
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    // const hashId = window.location.hash.slice(1);
    const hashId = window.location.hash.slice(1);
    if (!hashId) return;

    recipeView.spinner();

    // 1- loading recipe
    await model.loadRecipe(hashId);

    // 2- Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultView.spinner();
    // 1) get search query .
    const query = searchView.getQery();
    if (!query) return;

    // 2) load search results
    await model.searchResult(query);

    // 3) render the results & initial page button ATST .
    // don't want this line anymore because it displays
    // all the results which is against the pagination
    // resultView.render(model.state.search.result);
    resultView.render(model.getResultPage(1));
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlPagination = function (goToPage) {
  // 3) render the NEW results & page button ATST .
  resultView.render(model.getResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // 1) update the serving
  model.updateServings(newServing);
  // 2) update the recipe view
  recipeView.render(model.state.recipe);
};

const controlBookmark = function () {
  // add / remove bm
  if(!model.state.recipe.bookmarked) 
    model.addBookmark(model.state.recipe);
  else 
    model.removeBookmark(model.state.recipe.id);

  // update the recipe view
  recipeView.render(model.state.recipe);

  // render all bms
  bookmarkView.render(model.state.bookmarks);
};

const controlLoadBookmarks = function() {
  bookmarkView.render(model.state.bookmarks);
}

const controlNewRecipe = async function(newRecipe) {
try {// upload new recipe
  await model.uploadRecipe(newRecipe);
} catch(error) {
  newRecipeView.renderError(error.message);
}
}

const init = function () {
  bookmarkView.addHandlerRender(controlLoadBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  newRecipeView._addHandlerUploadNewRecipe(controlNewRecipe);
};

init();
