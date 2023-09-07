import { async } from "regenerator-runtime";
import { API_URL, KEY, RESULT_PER_PAGE } from "./config";
import { getJSON, sendJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    result: [],
    page: 1,
    reusltPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

// this method doesn't return anything, it just changes the state obj
export const loadRecipe = async function (hashId) {
  try {
    const data = await getJSON(`${API_URL}${hashId}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // save the state of bm's icon so it won't disappear .
    if (state.bookmarks.some((bm) => bm.id === hashId))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    throw error;
  }
};

export const searchResult = async function (query) {
  try {
    state.search.query = query; // there's no need to it right now
    // it's for exbandabily reasons .
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.result = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

// this function will not going to be async
// because we already have the results .
export const getResultPage = function (page = state.search.page) {
  state.search.page = page;

  const first = [page - 1] * state.search.reusltPerPage; // 0
  const last = page * state.search.reusltPerPage; // 9
  return state.search.result.slice(first, last);
};

export const updateServings = function (newServing) {
  // newQua = oldQua * newServings / oldServings
  state.recipe.ingredients.forEach((ingr) => {
    ingr.quantity = (ingr.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // add bk
  state.bookmarks.push(recipe);

  //mark current recipe as bk
  state.recipe.bookmarked = true;

  persistBookmarks();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  //unmark current recipe as bk
  state.recipe.bookmarked = false;

  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  // make a request to the API in order to upload
  // the new recipe therefor it's going to be
  // an async function .

  // 1) get the new data and convert it to be the
  // same format we've got it from the API .
  // convert the obj to an Array and using filter to
  // get just the ingredients.
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ingr) => {
        const ingrArray = ingr[1].replaceAll(" ", "").split(","); // replace all the empy spaces to an empty strings .
        if (ingrArray.length !== 3)
          throw new Error(
            "Wrong ingredients format. please use the correct format ♥"
          );
        const [quantity, unit, description] = ingrArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipeObj = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipeObj);
    console.log(data);
    location.reload();
  } catch (error) {
    throw error;
  }
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
