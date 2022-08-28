import 'regenerator-runtime/runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJson } from './helper.js';
const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export { state };

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);
    state.recipe = data.data.recipe;
    state.recipe = {
      cookingTime: state.recipe.cooking_time,
      id: state.recipe.id,
      imageUrl: state.recipe.image_url,
      ingredients: state.recipe.ingredients,
      publisher: state.recipe.publisher,
      servings: state.recipe.servings,
      sourceUrl: state.recipe.source_url,
      title: state.recipe.title,
    };
  } catch (err) {
    throw err;
  }
};

export const searchRecipe = async function (query) {
  try {
    state.search.page=1;
    const data = await getJson(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const searchRecipePage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
