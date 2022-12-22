let userLibrary = [];

function addBookToLib() {}

addBookToLib.prototype.pushToLib = function () {
    userLibrary.push(this);
}

function Book(title, author, pages, isRead) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.isRead = isRead
}

Book.prototype = Object.create(addBookToLib.prototype);

const main = document.querySelector('main');
const submitButton = document.querySelector('input[type = "submit"]');
let titleEntry = document.querySelector('#title');
let authorEntry = document.querySelector('#author');
let pagesEntry = document.querySelector('#pages');
let isReadEntry = document.querySelector('#status');

submitButton.addEventListener('click', (e) => {
    if (titleEntry.value.trim() === '') return;
    e.preventDefault();
    createCard(getBookObj());
});

function getBookObj() {
    const book = new Book(titleEntry.value, authorEntry.value, pagesEntry.value, isReadEntry.checked);
    book.pushToLib();
    return book;
}

function createCard(book) {
    const card = document.createElement('div');
    const title = document.createElement('h1');
    const author = document.createElement('p');
    const divider = document.createElement('hr');
    const pages = document.createElement('p');
    const isRead = document.createElement('p');

    title.innerHTML = book.title;
    author.innerHTML = book.pages;
    pages.innerHTML = book.pages;
    isRead.innerHTML = book.isRead;

    card.classList.add('book-card');
    title.classList.add('book-title');
    author.classList.add('book-author');
    divider.classList.add('card-divider');
    pages.classList.add('book-pages');
    isRead.classList.add('book-status');

    const cardItems = [title, author, divider, pages, isRead];

    cardItems.forEach((item) => {
        card.appendChild(item);
    });

    main.appendChild(card);
}