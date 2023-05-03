class ShowMoreButton {
  /**
   * Creates a ShowMoreButton instance
   * @param {number} page - The current page number
   * @param {number} BOOKS_PER_PAGE - The number of books to show per pag
   * @param {number} booksLength - The total number of books
   * @param {Array} matches - An array of book IDs that match the current search criteria
   */
  constructor(page, BOOKS_PER_PAGE, booksLength, matches = []) {
    this.page = page;
    this.BOOKS_PER_PAGE = BOOKS_PER_PAGE;
    this.booksLength = booksLength;
    this.matches = matches;
  }

  /**
   * Updates the show more button text and disabled state based on the current search results
   */
  update() {
    const showMoreButton = document.querySelector("[data-list-button]");
    const remainingBooks = this.booksLength - this.page * this.BOOKS_PER_PAGE;

    showMoreButton.innerText = `Show more (${remainingBooks})`;
    showMoreButton.disabled = remainingBooks <= 0 || !this.matches || remainingBooks < this.matches.length;
  }
}

export { ShowMoreButton };