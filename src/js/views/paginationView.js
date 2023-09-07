import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (event) {
      /*
        here we have function(event)
        because we cannot immediately call the handler
        that comes in here,
        because first, we will need to figure out
        which button was actually clicked, based on the event.
        So that's event delegation
    */
   const btn = event.target.closest(".btn--inline");
   if(!btn) return; // if the user clicked on any space other than 
   // the btn that will make the dataset = null which is an error .
   
   const goToPage = +btn.dataset.goto;
   handler(goToPage);
    });
  }

  _generateMarkup() {
    // calculate how many pages we have
    const howManyPages = Math.ceil(
      this._data.result.length / this._data.reusltPerPage
    );

    const currentPage = this._data.page;

    // we're in Page 1, and there are other pages .
    if (currentPage === 1 && howManyPages > 1) {
      return `
      <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // we're in last page .
    if (currentPage === howManyPages && howManyPages > 1) {
      return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
    }

    // we're in-between pages .
    if (currentPage < howManyPages) {
      return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }

    // we're in Page 1, and there are NO other pages .
    return "";
  }
}

export default new PaginationView();
