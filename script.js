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