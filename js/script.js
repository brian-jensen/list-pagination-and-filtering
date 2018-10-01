/* jshint esversion: 6 */

const page = document.querySelector('.page');
page.innerHTML += `
  <div class="pagination">
    <ul></ul>
  </div>
  <h1 class="no-results">no results found!</h1>
`;

const header = page.querySelector('.page-header');
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
let filteredName = [];
let combined = [];

const showPage = (list, page) => {
  list.forEach(item => item.style.display = 'none');

  const parsePages = list.reduce((array, item, index) => {
    const parsedPage = Math.floor(index / perPage);
    if (!array[parsedPage]) array[parsedPage] = [];
    array[parsedPage].push(item);
    return array;
  }, []);

  if (!page) {
    parsePages[0].forEach(page => page.style.display = 'block');
  } else {
    parsePages[page].forEach(page => page.style.display = 'block');
  }
};

const appendPageLinks = list => {
  const pages = Math.ceil(list.length / perPage);
  const noResults = page.querySelector('.no-results');
  const pagination = document.querySelector('.pagination');
  const paginationUl = pagination.querySelector('ul');

  pagination.style.display = 'none';
  noResults.style.display = 'none';
  paginationUl.innerHTML = '';

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
    paginationLinks[0].className = 'active';

    paginationLinks.forEach((link, index, array) => {
      link.addEventListener('click', event => {
        array.forEach(link => link.removeAttribute('class'));
        event.target.className = 'active';
        showPage(list, index);
      });
    });
  }

  if (list.length > 0) {
    showPage(list);
  } else {
    noResults.style.display = 'block';
  }
};

const search = list => {
  const search = header.querySelector('input');
  const button = header.querySelector('button');
  const names = studentList.querySelectorAll('h3');
  const emails = studentList.querySelectorAll('.email');

  names.forEach(name => namesArray.push(name.textContent));
  emails.forEach(email => emailsArray.push(email.textContent));

  for (let i = 0; i < list.length; i++) {
    combined.push(`${namesArray[i]} ${emailsArray[i]}`);
  }

  const performSearch = () => {
    list.forEach(item => item.style.display = 'none');
    filteredName = [];

    combined.forEach((name, index) => {
      if (name.toLowerCase().indexOf(search.value.toLowerCase()) > -1) {
        filteredName.push(list[index]);
      }
    });
    appendPageLinks(filteredName);
  };

  search.addEventListener('keyup', () => {
    performSearch();
  });

  button.addEventListener('click', () => {
    performSearch();
  });
};

appendPageLinks(students);
search(students);