/**
 * Search form object with genre options.
 * @typedef {Object} SearchForm
 * @property {Object} genres - The genres object
 */
const genreForm = {
    /**
     * Create and append genre options to the search form.
     * @param {Object} genres - The genres object containing id-name pairs.
     */
    createGenreOptions (genres) {
      const genreHtml = document.createDocumentFragment();
      const firstGenreElement = document.createElement("option");
      firstGenreElement.value = "any";
      firstGenreElement.innerText = "All Genres";
      genreHtml.appendChild(firstGenreElement);
  
      for (const [id, name] of Object.entries(genres)) {
        const element = document.createElement("option");
        element.value = id;
        element.innerText = name;
        genreHtml.appendChild(element);
      }
  
      document.querySelector("[data-search-genres]").appendChild(genreHtml);
    }
  }