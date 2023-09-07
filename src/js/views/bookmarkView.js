import View from "./view";
import icons from "url:../../img/icons.svg";

class BookmarkView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _message = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map((data) => {
        return `
            <li class="preview">
            <a class="preview__link"${data.id === window.location.hash.slice(1) ? "preview__link--active" : ""} href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
              </div>
            </a>
          </li>
            `;
      })
      .join("");
  }
}

export default new BookmarkView();
