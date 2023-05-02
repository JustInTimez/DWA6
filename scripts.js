import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { addEventListeners } from './listeners.js';


let page = 1;
export let matches = books;

/**
 * Book previews object that renders the display of the books
 */
 function createPreviewRenderer() {
  /**
   * Renders a set of book previews onto the page.
   * @param {Object[]} matches - The list of books to render previews for.
   * @param {string} matches[].author - The author of the book.
   * @param {string} matches[].id - The unique ID of the book.
   * @param {string} matches[].image - The URL of the book's cover image.
   * @param {string} matches[].title - The title of the book.
   * @param {number} numPerPage - The number of book previews to render per page.
   */
  return {
    renderBookPreviews(matches, numPerPage) {
      const starting = document.createDocumentFragment();
      // Only render the first numPerPage matches
      for (const { author, id, image, title } of matches.slice(0, numPerPage)) {
        const element = document.createElement("button");
        element.classList = "preview";
        element.setAttribute("data-preview", id);

        element.innerHTML = `
          <img
            class="preview__image"
            src="${image}"
          />
          
          <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
          </div>
        `;

        starting.appendChild(element);
      }
      document.querySelector("[data-list-items]").appendChild(starting);
    }
  }
}

// Create a BookPreviewRenderer object using the factory function
const BookPreviewRenderer = createPreviewRenderer();

// Call the function to render the book previews
BookPreviewRenderer.renderBookPreviews(matches, BOOKS_PER_PAGE);


/**
 * Search form object with genre options.
 * @typedef {Object} SearchForm
 * @property {Object} genres - The genres object
 */
 const searchForm = {
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

// Call the method to create genre options
searchForm.createGenreOptions(genres);



/**
 * Author form object with author options  
 * @typedef {Object} AuthorOptions
 * @property {Function} generate - Generates and appends author to the DOM
 */

 const authorOptions = {
  /**
   * Generates authors and appends them to the DOM.
   * @param {Object} authors - Object containing authors' IDs and names
   */
  generate(authors) {
    const authorsHtml = document.createDocumentFragment();

    // Create the first "All Authors" option
    const firstAuthorElement = document.createElement("option");
    firstAuthorElement.value = "any";
    firstAuthorElement.innerText = "All Authors";
    authorsHtml.appendChild(firstAuthorElement);

    // Create an option element for each author and add it to the fragment
    for (const [id, name] of Object.entries(authors)) {
      const element = document.createElement("option");
      element.value = id;
      element.innerText = name;
      authorsHtml.appendChild(element);
    }

    // Append the fragment to the DOM
    document.querySelector("[data-search-authors]").appendChild(authorsHtml);
  }
};
// Call the method to generate and append author options
authorOptions.generate(authors);


/**
 * Object containing the updateShowMoreButton method.
 * @typedef {Object} ShowMoreButton
 * @property {Function} update - Updates the show more button text and disabled state based on the current search results.
 */

 const showMoreButton = {
  /**
   * Updates the show more button text and disabled state based on the current search results.
   * @param {number} page - The current page number.
   * @param {number} BOOKS_PER_PAGE - The number of books to show per page.
   * @param {number} booksLength - The total number of books.
   * @param {Array} matches - An array of book IDs that match the current search criteria.
   */
  update(page, BOOKS_PER_PAGE, booksLength, matches) {
    const showMoreButton = document.querySelector("[data-list-button]");
    const remainingBooks = booksLength - page * BOOKS_PER_PAGE;

    showMoreButton.innerText = `Show more (${remainingBooks})`;
    showMoreButton.disabled =
      remainingBooks <= 0 || remainingBooks < matches.length;
  }
};

// Call the functions to execute the code
showMoreButton.update(page, BOOKS_PER_PAGE, books.length, matches);
addEventListeners();

export { page };