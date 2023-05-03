import {
  books,
  authors,
  BOOKS_PER_PAGE,
} from "../js/information/data.js";
import { addEventListeners } from "../js/listeners/listeners.js";
import { BookPreviewRenderer } from "../js/components/renderer.js";
import { AuthorsForm } from "../js/components/authors-form.js";
import { ShowMoreButton } from "../js/components/show-more.js";

let page = 1;
export let matches = books;

// Create a BookPreviewRenderer instance
const bookPreviewRenderer = new BookPreviewRenderer(authors);

// Call the function to render the book previews
bookPreviewRenderer.renderBookPreviews(matches, BOOKS_PER_PAGE);

// Call the method to create genre options
const authorsForm = new AuthorsForm(authors);
authorsForm.generate();

// Call the function to update the "Show more" button
const showMoreButton = new ShowMoreButton();
showMoreButton.update(page, BOOKS_PER_PAGE, books.length, matches);

addEventListeners();

export { page };