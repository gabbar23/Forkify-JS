import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
   
  addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e){
        const btn=e.target.closest('.btn--inline');
        if(!btn) return
        const gotoPage=+btn.dataset.goto
        handler(gotoPage);
        // handler();
    })
  }


  _generateMarkup() {
    
    const curPage = this._data.page;
    
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(curPage);
    console.log(numPages);

    if (curPage === 1 && numPages > 1) {
        console.log("here");
      return `<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    if (curPage === numPages && numPages > 1) {
        console.log("heredd");
      return `<button data-goto="${curPage - 1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    if (curPage < numPages) {
        console.log("heress");
        return `<button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
         <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }

    return ``;
  }
}
export default new PaginationView();
