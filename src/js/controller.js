import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as modal from './modal';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView.js'
import ResultView from './views/resultView';
import PaginationView from './views/paginationView.js';
import paginationView from './views/paginationView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipesControl = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    RecipeView.renderSpinner();
    ResultView.update(modal.searchRecipePage())
    await modal.loadRecipe(id);
    RecipeView.render(modal.state.recipe);
  

  } catch (err) {
    RecipeView.errorRender();
  }
};

const searchControl = async function () {
  try {
    ResultView.renderSpinner();
    const searchQuery = SearchView.getQuery()
    if (!searchQuery) return;
    await modal.searchRecipe(searchQuery);
    ResultView.render(modal.searchRecipePage());
    PaginationView.render(modal.state.search)
  } catch (err) {
    ResultView.errorRender();
    paginationView._clear()

    RecipeView.errorRender();
  }
};

const paginationControl=function(gotoPage){
  
  ResultView.render(modal.searchRecipePage(gotoPage));
  PaginationView.render(modal.state.search)
}

const updateServingsControl=function(newServings){
    modal.updateServings(newServings);
    // RecipeView.render(modal.state.recipe);
    RecipeView.update(modal.state.recipe)
}

const init = function () {
  RecipeView.addHandlerRender(recipesControl);
  RecipeView.addHandlerUpdateServings(updateServingsControl)
  SearchView.addHandlerSearch(searchControl);
  PaginationView.addHandlerClick(paginationControl)

};
init();
