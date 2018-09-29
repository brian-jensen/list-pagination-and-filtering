/* jshint esversion: 6 */

const page = document.querySelector('.page');
const studentList = document.querySelector('.student-list');
const students = studentList.querySelectorAll('.student-item');

const appendPageLinks = (list) => {
  const pages = Math.ceil(list.length / 10);
  const div = document.createElement('div');
  const ul = document.createElement('ul');

  div.className = "pagination";
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

};

appendPageLinks(students);
