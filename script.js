function Book(title, author, pageAmount, isRead) {
    this.title = title;
    this.author = author;
    this.pageAmount = pageAmount;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pageAmount} pages, ${this.isRead ? 'already read' : 'not read yet'}`;
};

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const donQuixote = new Book('Don Quixote', 'Miguel de Cervantes', 300, false);
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 400, false);

const library = [theHobbit, donQuixote, theGreatGatsby];

function showBooks() {
    const row = document.querySelector('#books-panel');
    row.innerHTML = '';
    library.forEach((item, index) => {
        const newElem = document.createElement('div');
        newElem.classList.add('col-4');
        newElem.innerHTML = `
            <div class="card mb-3">
                <div class="card-body" data-index="${index}">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.author}</p>
                    <p class="card-text">${item.pageAmount}</p>
                    <button id="read-notread" class="btn btn-${item.isRead ? 'success' : 'warning'}">${item.isRead ? 'read' : 'not read'}</button>
                    <button id="delete" class="btn btn-danger" id="delete" >Delete</button>
                </div>
            </div>
        `;
        row.appendChild(newElem);
        const readBtn = newElem.querySelector('#read-notread');
        readBtn.addEventListener('click', changeRead);
        const deleteBtn = newElem.querySelector('#delete');
        deleteBtn.addEventListener('click', deleteBook);
    });
}
showBooks();

function changeRead(e) {
    const index = e.target.parentElement.getAttribute('data-index');
    const isRead = !library[index].isRead;
    library[index].isRead = isRead;
    e.target.classList.remove(`btn-${!isRead ? 'success' : 'warning'}`);
    e.target.classList.add(`btn-${isRead ? 'success' : 'warning'}`);
    e.target.textContent = isRead ? 'read' : 'not read';
}

function deleteBook(e) {
    const index = e.target.parentElement.getAttribute('data-index');
    library.splice(index, 1);
    showBooks();
}

function addBookToLibrary() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const isRead = document.querySelector('#isread');
    const newBook = new Book(title.value, author.value, pages.value, isRead.checked);
    library.push(newBook);
    showBooks();
    console.log(library);
    title.value = '';
    author.value = '';
    pages.value = '';
    isRead.checked = false;
}


document.querySelector('form button').addEventListener('click', addBookToLibrary);

const newBookBtn = document.querySelector('.row .col-4 .btn-primary');
newBookBtn.addEventListener('click', () => {
    const form = document.querySelector('form');
    const isHidden = !form.hidden;
    form.hidden = isHidden;
});
