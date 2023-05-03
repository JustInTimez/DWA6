import { books, authors, genres, BOOKS_PER_PAGE } from '../js/information/data.js';
import { addEventListeners } from '../js/listeners/listeners.js';
import { BookPreviewRenderer } from '../js/components/renderer.js';

let page = 1;
export let matches = books;


// Create a BookPreviewRenderer instance
const bookPreviewRenderer = new BookPreviewRenderer();

// Call the function to render the book previews
bookPreviewRenderer.renderBookPreviews(matches, BOOKS_PER_PAGE);



// Call the method to create genre options
genreForm.createGenreOptions(genres);



// Call the functions to execute the code
showMoreButton.update(page, BOOKS_PER_PAGE, books.length, matches);
addEventListeners();

export { page };