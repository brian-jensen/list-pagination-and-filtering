/* jshint esversion: 6 */

const page = document.querySelector('.page');
// Injects pagination body and "no results" message into DOM.
page.innerHTML += `
  <div class="pagination">
    <ul></ul>
  </div>
  <h1 class="no-results">no results found!</h1>
`;

const header = page.querySelector('.page-header');
// Injects search bar and search button into DOM.
header.innerHTML += `
<div class="student-search">
  <input placeholder="Search for students..." autocorrect="off">
  <button>Search</button>
</div>
`;

const studentList = page.querySelector('.student-list');
const students = [...studentList.querySelectorAll('.student-item')];
const perPage = 10;
let namesArray = [];
let emailsArray = [];
let filteredInfo = [];
let combined = [];

/**
 * Displays progressively enhanced version of the webpage.
 * @param {array} list - Array of HTML list items.
 * @param {number} page - Number of parsed pagination pages.
 */
const showPage = (list, page) => {
  list.forEach(item => item.style.display = 'none');
  // Splits list array into separate arrays. The length of the new arrays are determined by the "perPage" global variable.
  const parsePages = list.reduce((array, item, index) => {
    const parsedPage = Math.floor(index / perPage);
    if (!array[parsedPage]) array[parsedPage] = [];
    array[parsedPage].push(item);
    return array;
  }, []);
  // Displays new paginated list items.
  if (!page) {
    parsePages[0].forEach(page => page.style.display = 'block');
  } else {
    parsePages[page].forEach(page => page.style.display = 'block');
  }
};

/**
 * Builds unobtrusive pagination navigation. 
 * @param {array} list Array of HTML list items.
 */
const appendPageLinks = list => {
  const pages = Math.ceil(list.length / perPage);
  const noResults = page.querySelector('.no-results');
  const pagination = document.querySelector('.pagination');
  const paginationUl = pagination.querySelector('ul');

  pagination.style.display = 'none';
  noResults.style.display = 'none';
  paginationUl.innerHTML = '';
  // Injects pagination links into DOM if list array length is greater than the perPage variable.
  if (list.length > perPage) {
    pagination.style.display = 'block';
    for (let i = 1; i <= pages; i++) {
      paginationUl.innerHTML += `
        <li>
          <a href="#">${i}</a>
        </li>
      `;
    }

    const paginationLinks = paginationUl.querySelectorAll('a');
    // Gives first pagination link class of active
    paginationLinks[0].className = 'active';

    paginationLinks.forEach((link, index, array) => {
      link.addEventListener('click', event => {
        // Gives selected pagination link class of active and removes it from others.
        array.forEach(link => link.removeAttribute('class'));
        event.target.className = 'active';
        showPage(list, index);
      });
    });
  }

  if (list.length > 0) {
    showPage(list);
  } else {
    // If no items match search input, display "no results" message;
    noResults.style.display = 'block';
  }
};

/**
 * Changes the displayed HTML list items based on user search input. 
 * @param {array} list Array of HTML list items.
 */
const search = list => {
  const search = header.querySelector('input');
  const button = header.querySelector('button');
  const names = studentList.querySelectorAll('h3');
  const emails = studentList.querySelectorAll('.email');
  // Builds array of the names in the currently displayed list items.
  names.forEach(name => namesArray.push(name.textContent));
  // Builds array of the email addresses in the currently displayed list items.
  emails.forEach(email => emailsArray.push(email.textContent));
  // Combines name and email address into a single array index, and pushes each set into the "combined" array.
  for (let i = 0; i < list.length; i++) {
    combined.push(`${namesArray[i]} ${emailsArray[i]}`);
  }
  // Performs users search.
  const performSearch = () => {
    list.forEach(item => item.style.display = 'none');
    filteredInfo = [];
    // Searches name and email address of each list item and hides the ones that don't match the users search input.
    combined.forEach((name, index) => {
      if (name.toLowerCase().indexOf(search.value.toLowerCase()) > -1) {
        filteredInfo.push(list[index]);
      }
    });
    // Displays results that match the users input to the page.
    appendPageLinks(filteredInfo);
  };
  // Filters list items in real time as the user types.
  search.addEventListener('keyup', () => {
    performSearch();
  });
  // Performs search on users pasted search term when search button is clicked.
  button.addEventListener('click', () => {
    performSearch();
  });
};

appendPageLinks(students);
search(students);