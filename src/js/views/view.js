import icons from 'url:../../img/icons.svg';
import fractional from 'fractional';

export default class View {
  _data;
  renderSpinner() {
    const spinnerMarkup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  errorRender(message = this._errorMessage) {
    
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  successRender(message = this._successMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
   
    if (!data || (Array.isArray(data) && data.length === 0)){
      
      this.render(this.errorRender());
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    
  }
  _clear() {
    
    this._parentElement.innerHTML = '';
  }
}
