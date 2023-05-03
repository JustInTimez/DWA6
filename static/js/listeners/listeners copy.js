// import { books, authors, BOOKS_PER_PAGE } from '/static/js/information/data.js';
// import { matches, page } from '../scripts.js';

// class EventListenerManager {
//   constructor() {
//     this.listeners = [
//       new SearchOverlayListener(),
//       new SettingsOverlayListener(),
//       new ListCloseButtonListener(),
//       new SettingsFormListener(),
//       new BookSearchListener(),
//       new ShowMoreListener(),
//     ];
//   }
// }

// new EventListenerManager();


// class EventListener {
//   constructor(selector, callback) {
//     this.element = document.querySelector(selector);
//     if (this.element) {
//       this.element.addEventListener('click', callback);
//     }
//   }
// }

// class SearchOverlayListener extends EventListener {
//   constructor() {
//     super('[data-header-search]', () => {
//       document.querySelector('[data-search-overlay]').open = true;
//       document.querySelector('[data-search-title]').focus();
//     });
//   }
// }

// class SettingsOverlayListener extends EventListener {
//   constructor() {
//     super('[data-header-settings]', () => {
//       document.querySelector('[data-settings-overlay]').open = true;
//     });
//   }
// }

// class ListCloseButtonListener extends EventListener {
//   constructor() {
//     super('[data-list-close]', () => {
//       document.querySelector('[data-list-active]').open = false;
//     });
//   }
// }

// class SettingsFormListener extends EventListener {
//   constructor() {
//     super('[data-settings-form]', (event) => {
//       event.preventDefault();
//       const formData = new FormData(event.target);
//       const { theme } = Object.fromEntries(formData);

//       if (theme === 'night') {
//         document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//         document.documentElement.style.setProperty('--color-light', '10, 10, 20');
//       } else {
//         document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//         document.documentElement.style.setProperty('--color-light', '255, 255, 255');
//       }

//       document.querySelector('[data-settings-overlay]').open = false;
//     });
//   }
// }

// class BookSearchListener extends EventListener {
//   constructor() {
//     super('[data-search-form]', (event) => {
//       event.preventDefault();

//       // Extract form data and convert it to an object.
//       const formData = new FormData(event.target);
//       const filters = Object.fromEntries(formData);

//       // Filter books based on form data.
//       const result = [];
//       for (const book of books) {
//         let genreMatch = filters.genre === "any";
//         for (const singleGenre of book.genres) {
//           if (genreMatch) break;
//           if (singleGenre === filters.genre) {
//             genreMatch = true;
//           }
//         }
//         if (
//           (filters.title.trim() === "" ||
//             book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
//           (filters.author === "any" || book.author === filters.author) &&
//           genreMatch
//         ) {
//           result.push(book);
//         }
//       }

//       // Update results display.
//       let page = 1;
//       let matches = result;

//       const listMessage = document.querySelector("[data-list-message]");
//       listMessage.classList.toggle("list__message_show", result.length < 1);

//       const listItems = document.querySelector("[data-list-items]");
//       listItems.innerHTML = "";
//       const newItems = document.createDocumentFragment();

//       for (const { author, id, image, title } of result.slice(
//         0,
//         BOOKS_PER_PAGE
//       )) {
//         const element = document.createElement("button");
//         element.classList = "preview";
//         element.setAttribute("data-preview", id);
//         element.innerHTML = `
//       <img class="preview__image" src="${image}" />
//       <div class="preview__info">
//           <h3 class="preview__title">${title}</h3>
//           <div class="preview__author">${authors[author]}</div>
//       </div>
//       `;
//         newItems.appendChild(element);
//       }

//       listItems.appendChild(newItems);
//       const listButton = document.querySelector("[data-list-button]");
//       listButton.disabled = matches.length - page * BOOKS_PER_PAGE < 1;
//       listButton.innerHTML = `
//       <span>Show more</span>
//       <span class="list__remaining">
//       (${
//         matches.length - page * BOOKS_PER_PAGE > 0
//           ? matches.length - page * BOOKS_PER_PAGE
//           : 0
//       })
//       </span>
//     `;

//       window.scrollTo({ top: 0, behavior: "smooth" });
//       document.querySelector("[data-search-overlay]").open = false;
//     });
//   }
// }

// class ShowMoreListener {
//   constructor() {
//     // Add event listener to the "Show more" button
//     document.querySelector("[data-list-button]").addEventListener("click", this.showMore);
    
//     // Add event listener to the book previews container
//     document.querySelector("[data-list-items]").addEventListener("click", this.showDetails);
    
//     // Initial page of book previews
//     this.page = 0;
//   }

//   /**
//    * Renders more book previews to the page.
//    *
//    * @param {MouseEvent} event - The click event object.
//    */
//   showMore = (event) => {
//     // Create a new document fragment to hold the new book preview elements
//     const fragment = document.createDocumentFragment();
  
//     // Iterate over a slice of the "matches" array that corresponds to the current page of previews
//     for (const { author, id, image, title } of matches.slice(
//       this.page * BOOKS_PER_PAGE,
//       (this.page + 1) * BOOKS_PER_PAGE
//     )) {
//       // Create a new button element for each book preview
//       const element = document.createElement("button");
//       element.classList = "preview";
//       element.setAttribute("data-preview", id);
  
//       // Set the button's inner HTML to the book preview template, populated with book data
//       element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />
  
//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${authors[author]}</div>
//         </div>
//         `;
  
//       // Append the new button element to the document fragment
//       fragment.appendChild(element);
//     }
  
//     // Append the document fragment to the list of book previews
//     document.querySelector("[data-list-items]").appendChild(fragment);
  
//     // Increment the current page of book previews
//     this.page += 1;
//   };

//   /**
//    * Displays detailed information about the clicked book preview.
//    *
//    * @param {MouseEvent} event - The click event object.
//    */
//   showDetails = (event) => {
//     const pathArray = Array.from(event.path || event.composedPath());
//     let active = null;

//     // Find the clicked item by searching for a data-preview attribute in the clicked node or its parents.
//     for (const node of pathArray) {
//       if (active) break;

//       if (node?.dataset?.preview) {
//         // Find the book with the matching ID.
//         let result = null;
//         for (const singleBook of books) {
//           if (result) break;
//           if (singleBook.id === node?.dataset?.preview) result = singleBook;
//         }

//         active = result;
//       }
//     }

//     // If a matching book was found, update the active book display with its information.
//     if (active) {
//       document.querySelector("[data-list-active]").open = true;
//       document.querySelector("[data-list-blur]").src = active.image;
//       document.querySelector("[data-list-image]").src = active.image;
//       document.querySelector("[data-list-title]").innerText = active.title;
//       document.querySelector("[data-list-subtitle]").innerText = `${
//         authors[active.author]
//       } (${new Date(active.published).getFullYear()})`;
//       document.querySelector("[data-list-description]").innerText =
//         active.description;
//     }
//   };
// }