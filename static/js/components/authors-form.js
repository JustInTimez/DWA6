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