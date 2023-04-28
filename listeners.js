import { books, authors, BOOKS_PER_PAGE } from "./data.js";

/**
 * All listeners
 * Adds event listeners for the search and settings overlays.
 */
export function addEventListeners() {
  // Search overlay
  document
    .querySelector("[data-search-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = false;
    });

  // Settings overlay
  document
    .querySelector("[data-settings-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = false;
    });

  /**
   * Adds an event listener to the search button, which opens the search overlay
   * and focuses on the search input field.
   *
   * @function
   * @name handleSearchButtonClick
   */
  document
    .querySelector("[data-header-search]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = true;
      document.querySelector("[data-search-title]").focus();
    });

  /**
   * Adds an event listener to the settings button, which opens the settings overlay.
   *
   * @function
   * @name handleSettingsButtonClick
   */
  document
    .querySelector("[data-header-settings]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = true;
    });

  /**
   * Adds an event listener to the list close button, which closes the active list overlay.
   *
   * @function
   * @name handleListCloseButtonClick
   */
  document.querySelector("[data-list-close]").addEventListener("click", () => {
    document.querySelector("[data-list-active]").open = false;
  });

  /**
   * Adds an event listener to the settings form, which prevents the default form submission
   * behavior, gets the selected theme from the form data, and sets the CSS variables accordingly.
   * Finally, it closes the settings overlay.
   *
   * @function
   * @name handleSettingsFormSubmit
   * @param {Event} event - The form submission event.
   */
  document
    .querySelector("[data-settings-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const { theme } = Object.fromEntries(formData);

      if (theme === "night") {
        document.documentElement.style.setProperty(
          "--color-dark",
          "255, 255, 255"
        );
        document.documentElement.style.setProperty(
          "--color-light",
          "10, 10, 20"
        );
      } else {
        document.documentElement.style.setProperty(
          "--color-dark",
          "10, 10, 20"
        );
        document.documentElement.style.setProperty(
          "--color-light",
          "255, 255, 255"
        );
      }

      document.querySelector("[data-settings-overlay]").open = false;
    });

  /**
   * Handles form submission for book search and updates the results display.
   * @param {Event} event - The submit event.
   */
  document
    .querySelector("[data-search-form]")
    .addEventListener("submit", (event) => {
      event.preventDefault();

      // Extract form data and convert it to an object.
      const formData = new FormData(event.target);
      const filters = Object.fromEntries(formData);

      // Filter books based on form data.
      const result = [];
      for (const book of books) {
        let genreMatch = filters.genre === "any";
        for (const singleGenre of book.genres) {
          if (genreMatch) break;
          if (singleGenre === filters.genre) {
            genreMatch = true;
          }
        }
        if (
          (filters.title.trim() === "" ||
            book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
          (filters.author === "any" || book.author === filters.author) &&
          genreMatch
        ) {
          result.push(book);
        }
      }

      // Update results display.
      page = 1;
      matches = result;

      const listMessage = document.querySelector("[data-list-message]");
      listMessage.classList.toggle("list__message_show", result.length < 1);

      const listItems = document.querySelector("[data-list-items]");
      listItems.innerHTML = "";
      const newItems = document.createDocumentFragment();

      for (const { author, id, image, title } of result.slice(
        0,
        BOOKS_PER_PAGE
      )) {
        const element = document.createElement("button");
        element.classList = "preview";
        element.setAttribute("data-preview", id);
        element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>
      `;
        newItems.appendChild(element);
      }

      listItems.appendChild(newItems);
      const listButton = document.querySelector("[data-list-button]");
      listButton.disabled = matches.length - page * BOOKS_PER_PAGE < 1;
      listButton.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining">
      (${
        matches.length - page * BOOKS_PER_PAGE > 0
          ? matches.length - page * BOOKS_PER_PAGE
          : 0
      })
      </span>
    `;

      window.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector("[data-search-overlay]").open = false;
    });

  /**
   * Adds an event listener to the "Show more" button that renders more book previews
   * @event click
   */
  document.querySelector("[data-list-button]").addEventListener("click", () => {
    // Create a new document fragment to hold the new book preview elements
    const fragment = document.createDocumentFragment();

    // Iterate over a slice of the "matches" array that corresponds to the current page of previews
    for (const { author, id, image, title } of matches.slice(
      page * BOOKS_PER_PAGE,
      (page + 1) * BOOKS_PER_PAGE
    )) {
      // Create a new button element for each book preview
      const element = document.createElement("button");
      element.classList = "preview";
      element.setAttribute("data-preview", id);

      // Set the button's inner HTML to the book preview template, populated with book data
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

      // Append the new button element to the document fragment
      fragment.appendChild(element);
    }

    // Append the document fragment to the list of book previews
    document.querySelector("[data-list-items]").appendChild(fragment);

    // Increment the current page of book previews
    page += 1;
  });

  /**
   * Listen for click events on the list items container and display
   * detailed information about the clicked item.
   *
   * @param {MouseEvent} event - The click event object.
   */
  document
    .querySelector("[data-list-items]")
    .addEventListener("click", (event) => {
      const pathArray = Array.from(event.path || event.composedPath());
      let active = null;

      // Find the clicked item by searching for a data-preview attribute in the clicked node or its parents.
      for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
          // Find the book with the matching ID.
          let result = null;
          for (const singleBook of books) {
            if (result) break;
            if (singleBook.id === node?.dataset?.preview) result = singleBook;
          }

          active = result;
        }
      }

      // If a matching book was found, update the active book display with its information.
      if (active) {
        document.querySelector("[data-list-active]").open = true;
        document.querySelector("[data-list-blur]").src = active.image;
        document.querySelector("[data-list-image]").src = active.image;
        document.querySelector("[data-list-title]").innerText = active.title;
        document.querySelector("[data-list-subtitle]").innerText = `${
          authors[active.author]
        } (${new Date(active.published).getFullYear()})`;
        document.querySelector("[data-list-description]").innerText =
          active.description;
      }
    });
}