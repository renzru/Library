let userLibrary = [];

function Book(title, author, pages, isRead) {
  function addToLibrary() {
    userLibrary.push(this);
  }

  return {
    title,
    author,
    pages,
    isRead,
    addToLibrary,
  };
}

const readBooks = document.querySelector('.books-read');
const notreadBooks = document.querySelector('.books-toread');
const submitButton = document.querySelector('input[type = "submit"]');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookisRead = document.querySelector('#read');

submitButton.addEventListener('click', (e) => {
  if (emptyInput(bookTitle.value)) return;

  e.preventDefault();
  createCard(getBookObj());
});

function emptyInput(input) {
  return input.trim() === '';
}

function getBookObj() {
  const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookisRead.checked);
  book.addToLibrary();

  return book;
}

function switchReadStatus(book, status, card) {
  // eslint-disable-next-line no-param-reassign
  book.isRead = book.isRead !== true;

  if (book.isRead === true) {
    status.classList.remove('toread');
    status.classList.add('read');
    readBooks.appendChild(card);
  } else {
    status.classList.remove('read');
    status.classList.add('toread');
    notreadBooks.appendChild(card);
  }
}

function createCard(book) {
  const card = document.createElement('article');
  const headerWrapper = document.createElement('div');
  const title = document.createElement('h1');
  const author = document.createElement('p');
  const divider = document.createElement('hr');
  const pages = document.createElement('p');
  const deleteButton = document.createElement('button');
  const status = document.createElement('div');

  title.innerHTML = book.title;
  author.innerHTML = book.author;
  deleteButton.innerHTML = 'x';
  status.innerHTML = ' ';
  if (emptyInput(book.pages)) pages.innerHTML = '';
  else pages.innerHTML = `Pages: ${book.pages}`;

  card.classList.add('card');
  headerWrapper.classList.add('card-header');
  title.classList.add('title');
  author.classList.add('author');
  divider.classList.add('card-divider');
  pages.classList.add('pages');
  deleteButton.classList.add('delete-button');
  status.classList.add('status');
  if (book.isRead === true) status.classList.add('read');
  else status.classList.add('toread');

  card.dataset.book = book.title;
  card.dataset.id = genID();
  deleteButton.addEventListener('click', () => {
    removeBook(card.dataset.book, card.dataset.id);
  });

  status.addEventListener('click', () => {
    switchReadStatus(book, status, card);
  });

  const headerItems = [deleteButton, title, author];
  headerItems.forEach((item) => {
    headerWrapper.appendChild(item);
  });

  const cardItems = [headerWrapper, divider, pages, status];

  cardItems.forEach((item) => {
    card.appendChild(item);
  });

  if (book.isRead === true) readBooks.appendChild(card);
  else notreadBooks.appendChild(card);
}

function genID() {
  return `id${Math.random().toString(36)}`;
}

function removeBook(titleToRemove, id) {
  userLibrary = userLibrary.filter((book) => book.title !== titleToRemove);
  const card = document.querySelector(`article[data-id='${id}']`);
  card.remove();
}
