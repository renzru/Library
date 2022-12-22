let userLibrary = [];

function addBook() {}

addBook.prototype.newArr = function () {
    userLibrary.push(this);
}

function Book(title, author, pages, status) {
    this.title = title,
        this.author = author,
        this.pages = pages,
        this.status = status
}

Book.prototype = Object.create(addBook.prototype);

const book1 = new Book('Holes', 'Louis Sachar', 251, 'Read');
book1.newArr();

function updatePage() {

}

const submitButton = document.querySelector('input[type = "submit"]');
let titleEntry = document.querySelector('#title');
let authorEntry = document.querySelector('#author');
let pagesEntry = document.querySelector('#pages');
let statusEntry = document.querySelector('#status');
const main = document.querySelector('main');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addCard();
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