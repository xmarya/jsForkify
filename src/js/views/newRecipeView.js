import View from "./view";

class NewRecipeView extends View {
  _parentEl = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _btnUpload = document.querySelector(".upload__btn");

  constructor() {
    super();
    this._addHandlerShowNewRecipeWindow();
    this._addHandlerCloseNewRecipeWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowNewRecipeWindow() {
    // controller.js has nothing to do with this function,
    // but how we call it then ?
    // just use the constructer to call it
    // the moment an obj is created .
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerCloseNewRecipeWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerUploadNewRecipe(handler) {
    this._parentEl.addEventListener("submit", function (event) {
      event.preventDefault();
      /* const dataArray = [...new FormData(this)]; // this keywor is the form element itself .
      // the recipe in model.js is an obj so we need to convert
      // this Array to an obj.
      const data = Object.fromEntries(dataArray); */
      const data = Object.fromEntries(new FormData(this));
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new NewRecipeView();
