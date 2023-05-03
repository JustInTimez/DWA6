class AuthorsForm {
    /**
     * Creates an AuthorsForm instance.
     * @param {Object} authors - Object containing authors' IDs and names
     */
    constructor(authors) {
      this.authors = authors;
    }
  
    /**
     * Generates and appends author options to the DOM.
     */
    generate() {
      const authorsHtml = document.createDocumentFragment();
  
      // Create the first "All Authors" option
      const firstAuthorElement = document.createElement("option");
      firstAuthorElement.value = "any";
      firstAuthorElement.innerText = "All Authors";
      authorsHtml.appendChild(firstAuthorElement);
  
      // Create an option element for each author and add it to the fragment
      for (const [id, name] of Object.entries(this.authors)) {
        const element = document.createElement("option");
        element.value = id;
        element.innerText = name;
        authorsHtml.appendChild(element);
      }
  
      // Append the fragment to the DOM
      document.querySelector("[data-search-authors]").appendChild(authorsHtml);
    }
  }
  
  export { AuthorsForm };  