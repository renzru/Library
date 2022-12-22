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
const finishedBooks = document.querySelector('.books-read');
const unfinishedBooks = document.querySelector('.books-toread');
const finishedHeader = document.querySelector('.read-header')
const unfinishedHeader = document.querySelector('.toread-header')
const sectionDivider = document.querySelector('.section-divider');
const submitButton = document.querySelector('input[type = "submit"]');
let titleEntry = document.querySelector('#title');
let authorEntry = document.querySelector('#author');
let pagesEntry = document.querySelector('#pages');
let isReadEntry = document.querySelector('#status');

submitButton.addEventListener('click', (e) => {
    if (titleEntry.value.trim() === '') return;
    main.classList.remove('hidden');

    e.preventDefault();
    createCard(getBookObj());
    updateSection();
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
    const statusColor = document.createElement('div');

    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = `Pages: ${book.pages}`;
    isRead.innerHTML = `Status: ${checkStatus(book)}`;
    remove.innerHTML = 'X';
    statusColor.innerHTML = ' '

    card.dataset.book = book.title;
    card.dataset.id = genID();

    remove.addEventListener('click', () => {
        removeBook(card.dataset.book, card.dataset.id)
        updateMain();
    });

    card.classList.add('book-card');
    cardHeader.classList.add('card-header');
    title.classList.add('book-title');
    author.classList.add('book-author');
    divider.classList.add('card-divider');
    pages.classList.add('book-pages');
    isRead.classList.add('book-status');
    remove.classList.add('book-remove');
    statusColor.classList.add('book-color');

    if (book.isRead === true) statusColor.classList.add('read');
    else statusColor.classList.add('notread');

    const headerItems = [remove, title, author];
    headerItems.forEach((item) => {
        cardHeader.appendChild(item);
    })

    const cardItems = [cardHeader, divider, pages, isRead, statusColor];

    cardItems.forEach((item) => {
        card.appendChild(item);
    });

    if (book.isRead === true) finishedBooks.appendChild(card);
    else unfinishedBooks.appendChild(card);
}

function checkStatus(book) {
    if (book.isRead === true) return "Read";
    else return "Not Read";
}

function genID() {
    return "id" + Math.random().toString(36);
}

function removeBook(titleToRemove, id) {
    userLibrary = userLibrary.filter((book) => book.title !== titleToRemove);
    const card = document.querySelector(`article[data-id='${id}']`);
    card.remove();
}




// For Appearance/ Eye-Candy 
function updateSection() {
    if (finishedBooks.hasChildNodes() === true && unfinishedBooks.hasChildNodes() === true) {
        sectionDivider.classList.remove('hidden');
    }

    if (finishedBooks.hasChildNodes() === true) {
        finishedBooks.classList.remove('hidden');
        finishedHeader.classList.remove('hidden');
    }
    if (unfinishedBooks.hasChildNodes() === true) {
        unfinishedBooks.classList.remove('hidden');
        unfinishedHeader.classList.remove('hidden');
    }
}


function updateMain() {
    if (finishedBooks.hasChildNodes() === false || unfinishedBooks.hasChildNodes() === false) {
        sectionDivider.classList.add('hidden');
    }
    if (finishedBooks.hasChildNodes() === false) {
        finishedBooks.classList.add('hidden');
        finishedHeader.classList.add('hidden');
        sectionDivider.classList.add('hidden');
    }
    if (unfinishedBooks.hasChildNodes() === false) {
        unfinishedBooks.classList.add('hidden');
        unfinishedHeader.classList.add('hidden');
        sectionDivider.classList.add('hidden');
    }
    if (finishedBooks.hasChildNodes() === false && unfinishedBooks.hasChildNodes() === false) {
        main.classList.add('hidden');
    }
}