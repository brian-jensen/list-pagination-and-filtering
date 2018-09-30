/* jshint esversion: 6 */

const page = document.querySelector('.page');
const studentList = document.querySelector('.student-list');
const students = [...studentList.querySelectorAll('.student-item')];
const header = document.querySelector('.page-header');
const perPage = 10;

header.innerHTML += `
  <div class="student-search">
    <input placeholder="Search for students..." 
      autocorrect="off"
      spellcheck="false"
      autocomplete="off"
      autocapitalize="off"
    >
    <button>Search</button>
  </div>
`;

const search = header.querySelector('input');
const button = header.querySelector('button');

const showPage = (list, page) => {
  
  const parsePages = list.reduce((array, item, index) => {
    const parsedPage = Math.floor(index / perPage);
    if (!array[parsedPage]) array[parsedPage] = [];
    array[parsedPage].push(item);
    return array;
  }, []);

  if (!page) {
    list.forEach(item => item.style.display = 'none');
    parsePages[0].forEach(page => page.style.display = 'block');
  } else {
    list.forEach(item => item.style.display = 'none');
    parsePages[page].forEach(page => page.style.display = 'block');
  }
 
  search.addEventListener('keyup', () => {
  console.log(search.value);
  });

  button.addEventListener('click', () => {
  console.log(search.value);
  search.value = '';
  });

};

const appendPageLinks = list => {

  showPage(list);

  const pages = Math.ceil(list.length / 10);
  const div = document.createElement('div');
  const ul = document.createElement('ul');

  div.className = 'pagination';
  page.appendChild(div);

  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = '';

  pagination.appendChild(ul);
  const paginationUl = pagination.querySelector('ul');

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
      event.target.className = "active";
      showPage(list, index);
    });
  });
};

appendPageLinks(students);