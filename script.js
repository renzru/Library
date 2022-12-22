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
    const card = document.createElement('article');
    const cardHeader = document.createElement('div');
    const title = document.createElement('h1');
    const author = document.createElement('p');
    const divider = document.createElement('hr');
    const pages = document.createElement('p');
    const isRead = document.createElement('p');
    const remove = document.createElement('button');

    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = book.pages;
    isRead.innerHTML = book.isRead;
    remove.innerHTML = 'X';

    card.dataset.book = book.title;
    remove.dataset.book = book.title;

    remove.addEventListener('click', () => {
        removeBook(remove.dataset.book)
    });

    card.classList.add('book-card');
    cardHeader.classList.add('card-header');
    title.classList.add('book-title');
    author.classList.add('book-author');
    divider.classList.add('card-divider');
    pages.classList.add('book-pages');
    isRead.classList.add('book-status');
    remove.classList.add('book-remove');

    const headerItems = [remove, title, author];
    headerItems.forEach((item) => {
        cardHeader.appendChild(item);
    })

    const cardItems = [cardHeader, divider, pages, isRead];

    cardItems.forEach((item) => {
        card.appendChild(item);
    });

    main.appendChild(card);
}

function removeBook(titleToRemove) {
    userLibrary = userLibrary.filter((book) => book.title !== titleToRemove);
    const card = document.querySelector(`article[data-book=${titleToRemove}]`);
    card.remove();
}