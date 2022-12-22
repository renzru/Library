let userLibrary = [];

function addBookToLib() {}

addBookToLib.prototype.pushToLib = function () {
    userLibrary.push(this);
}

function Book(title, author, pages, status) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.status = status
}

Book.prototype = Object.create(addBookToLib.prototype);



const main = document.querySelector('main');
const submitButton = document.querySelector('input[type = "submit"]');
let titleEntry = document.querySelector('#title');
let authorEntry = document.querySelector('#author');
let pagesEntry = document.querySelector('#pages');
let statusEntry = document.querySelector('#status');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addCard();

    const book = new Book(titleEntry.value, authorEntry.value, pagesEntry.value, statusEntry.value);
    book.pushToLib();
});

function addCard() {
    const card = document.createElement('div');
    const title = document.createElement('h1');
    const author = document.createElement('p');
    const divider = document.createElement('hr');
    const pages = document.createElement('p');
    const status = document.createElement('p');

    title.innerHTML = titleEntry.value;
    author.innerHTML = authorEntry.value;
    pages.innerHTML = pagesEntry.value;
    status.innerHTML = statusEntry.value;

    card.classList.add('book-card');
    title.classList.add('book-title');
    author.classList.add('book-author');
    divider.classList.add('card-divider');
    pages.classList.add('book-pages');
    status.classList.add('book-status');

    const cardItems = [title, author, divider, pages, status];

    cardItems.forEach((item) => {
        card.appendChild(item);
    });

    main.appendChild(card);
}