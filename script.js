class Book {
  constructor(title, author, pages, isRead) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.isRead = isRead;
  }
}

Book.prototype.addToLibrary = (library, book) => {
  library.push(book);
};

const populatePage = () => {
  let userLibrary = [];
  const readBooks = document.querySelector('.books-read');
  const unreadBooks = document.querySelector('.books-toread');
  const submitButton = document.querySelector('input[type = "submit"]');
  const bookTitle = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const bookPages = document.querySelector('#pages');
  const bookisRead = document.querySelector('#read');

  function initialize() {
    submitButton.addEventListener('click', (e) => {
      if (emptyInput(bookTitle.value)) return;

      e.preventDefault();
      createCard(getBook());
      console.log(userLibrary);
    });
  }

  function getBook() {
    const book = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookisRead.checked);
    book.addToLibrary(userLibrary, book);

    return book;
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

    card.dataset.id = genID();
    deleteButton.addEventListener('click', () => {
      removeBook(book.title, card.dataset.id);
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
    else unreadBooks.appendChild(card);
  }

  function emptyInput(input) {
    return input.trim() === '';
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
      unreadBooks.appendChild(card);
    }
  }

  function genID() {
    return `id${Math.random().toString(36)}`;
  }

  function removeBook(toRemove, id) {
    userLibrary = userLibrary.filter((book) => book.title !== toRemove);

    const card = document.querySelector(`article[data-id="${id}"]`);
    card.remove();
  }

  return {
    initialize,
  };
};

populatePage().initialize();
