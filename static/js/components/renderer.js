class BookPreviewRenderer {
  /**
   * Creates a BookPreviewRenderer instance
   */
  constructor(authors) {
    this.authors = authors;
  }

  /**
   * Renders a set of book previews onto the page
   * @param {Object[]} matches - The list of books to render previews for
   * @param {string} matches[].author - The author of the book
   * @param {string} matches[].id - The unique ID of the book
   * @param {string} matches[].image - The URL of the book's cover image
   * @param {string} matches[].title - The title of the book
   * @param {number} numPerPage - The number of book previews to render per page
   */
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
              <div class="preview__author">${this.authors[author]}</div>
            </div>
          `;

      starting.appendChild(element);
    }
    document.querySelector("[data-list-items]").appendChild(starting);
  }
}

export { BookPreviewRenderer };