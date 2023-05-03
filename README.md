# DWA9 (10)
In this challenge, I will continue with the “Book Connect” codebase and further iterate on my abstractions.
Previously, I worked on adding abstraction around the book preview functionality of the project. Next, you must turn the book preview abstraction into a fully-working web component. Then, apply the techniques you’ve learned about this module to the book preview.

# DWA8
DWA8 Challenge from CodeSpace:
This repo has been updated to include the next section on DWA8 as it builds on from DWA6.

## Description
In this Module, you will continue with your “Book Connect” codebase, and further iterate on your abstractions. You will be required to create an encapsulated abstraction of the book preview by means of a single factory function. If you are up for it you can also encapsulate other aspects of the app into their own abstractions.


# DWA6
DWA 6 Challenge from CodeSpace:

This exercise presents you with a working version of the “Book Connect” website. However, you must use objects and functions as abstractions to make the code more maintainable, extendable and easier to change.


## Description

- This code is for a book search application. It starts by importing data.js which contains data on books, authors, and genres.

- The renderBookPreviews function is defined to render a set of book previews onto the page. The function takes in matches, an array of books to render previews for, and numPerPage, the number of book previews to render per page.

- The createGenreOptions function is defined to create and append genre options to the search form. It takes in the genres object containing id-name pairs.

- The generateAuthorOptions function is defined to generate HTML options for authors and appends them to the DOM. It takes in an object containing authors' IDs and names.

- The setTheme function checks the user's preferred color scheme and sets the appropriate theme.

- The updateShowMoreButton function updates the show more button text and disabled state based on the current search results. It takes in page, BOOKS_PER_PAGE, booksLength, and matches.

- The addEventListeners function adds event listeners for the search and settings overlays.

- The code ends by calling the functions to execute the code.