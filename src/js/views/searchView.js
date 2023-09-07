class SearchView {
  _parentEl = document.querySelector(".search");

  getQery() {
    return this._parentEl.querySelector(".search__field").value;
  }

  addHandlerSearch(handler) {
    // why not the button ? because we want to listin o the submit
    // event of the entire form not the button's click one .
    // so we can handel the event wheather the user clicked
    // the button or pressed Enter key .
    this._parentEl.addEventListener("submit", function (event) {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
