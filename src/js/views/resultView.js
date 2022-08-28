import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _successMessage = '';

  _generateMarkup(){
   return this._data.map(el=>this.generateMarkupView(el)).join('');
  }

  generateMarkupView(result){
    const currentId=window.location.hash.slice(1);

    return ` <li class="preview">
    <a class="preview__link ${result.id==currentId?'preview__link--active':''} " href="#${result.id}">
      <figure class="preview__fig">
        <img src=${result.image} alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
    
      </div>
    </a>
  </li>`
  }
}

export default new ResultView();
