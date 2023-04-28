import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { addEventListeners } from './listeners.js';

let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

/**
 * Renders a set of book previews onto the page.
 *
 * @param {Object[]} matches - The list of books to render previews for.
 * @param {string} matches[].author - The author of the book.
 * @param {string} matches[].id - The unique ID of the book.
 * @param {string} matches[].image - The URL of the book's cover image.
 * @param {string} matches[].title - The title of the book.
 * @param {number} numPerPage - The number of book previews to render per page.
 */
function renderBookPreviews(matches, numPerPage) {
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
}

// Call the function to render the book previews
renderBookPreviews(matches, BOOKS_PER_PAGE);
document.querySelector("[data-list-items]").appendChild(starting);



/**
 * Create and append genre options to the search form.
 * @param {Object} genres - The genres object containing id-name pairs.
 */
function createGenreOptions(genres) {
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
createGenreOptions(genres);



/**
 * Generates HTML options for authors and appends them to the DOM.
 *
 * @param {Object} authors - Object containing authors' IDs and names
 */
function generateAuthorOptions(authors) {
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
generateAuthorOptions(authors);




/**
 * Check the user's preferred color scheme and set the appropriate theme.
 */
function setTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // If the user prefers a dark theme:
    document.querySelector("[data-settings-theme]").value = "night";
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    // Otherwise, set the theme to light:
    document.querySelector("[data-settings-theme]").value = "day";
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }
}
setTheme();



/**
 * Updates the show more button text and disabled state based on the current search results.
 *
 * @param {number} page - The current page number.
 * @param {number} BOOKS_PER_PAGE - The number of books to show per page.
 * @param {number} booksLength - The total number of books.
 * @param {Array} matches - An array of book IDs that match the current search criteria.
 */
function updateShowMoreButton(page, BOOKS_PER_PAGE, booksLength, matches) {
  const showMoreButton = document.querySelector("[data-list-button]");
  const remainingBooks = booksLength - page * BOOKS_PER_PAGE;

  showMoreButton.innerText = `Show more (${remainingBooks})`;
  showMoreButton.disabled =
    remainingBooks <= 0 || remainingBooks < matches.length;
}



// Call the functions to execute the code
updateShowMoreButton(page, BOOKS_PER_PAGE, books.length, matches);

addEventListeners();