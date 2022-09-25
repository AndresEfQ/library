// DOM elements
const grid = document.querySelector('.grid');
const openAddBook = document.querySelector('.add-book');
const addBook = document.querySelector('#add-new-book')
const hidden = document.querySelectorAll('.hidden');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const language = document.querySelector('#language');
const pages = document.querySelector('#pages');
const isRead = document.querySelector('#read');

class Book {
  constructor(title, author, language, pages, isRead) {
    this.title = title;
    this.author = author; 
    this.language = language;
    this.pages = pages;
    this.isRead = isRead;
  }
  
  render = function() {

    // book
    const thisBook = document.createElement('div');
    thisBook.classList.add('book');
    thisBook.dataset.title = `${this.title}-book`;
    
    // book inner
    const bookInner = document.createElement('div');
    bookInner.tabIndex = '0';
    bookInner.dataset.title = `${this.title}-inner`;
    bookInner.addEventListener('blur', function() {this.parentNode.classList.remove('book-flipped')})
    bookInner.classList.add('book-inner');
    
    // book front
    const bookFront = document.createElement('div');
    bookFront.classList.add('book-front');
    
    // book title
    const title = document.createElement('h2');
    title.innerText = this.title;
    bookFront.appendChild(title);
    
    // book author
    const author = document.createElement('p');
    author.innerText = `By: ${this.author}`;
    bookFront.appendChild(author);
    
    // book language
    const language = document.createElement('p');
    language.innerText = `Language: ${this.language}`;
    bookFront.appendChild(language);
    
    // book pages
    const pages = document.createElement('p');
    pages.innerText = `${this.pages} pages`;
    bookFront.appendChild(pages);
    
    // book controls
    const controls = document.createElement('div');
    controls.classList.add('controls');
    
    // control read
    const read = document.createElement('button');
    read.innerText = this.isRead ? 'Read' : 'Not read';
    read.classList = this.isRead ? 'read' : '';
    read.classList.add('button');
    read.dataset.title = `${this.title}`;
    read.addEventListener('click', (e) => this.toggleRead(e, activeLibrary));
    controls.appendChild(read);
    
    // control remove
    const remove = document.createElement('button');
    remove.innerText = 'Remove';
    remove.classList.add('button');
    remove.dataset.title = `${this.title}`;
    remove.addEventListener('click', this.removeBook);
    controls.appendChild(remove);
    
    bookFront.appendChild(controls);
    bookInner.appendChild(bookFront);
    
    // book back
    const bookBack = document.createElement('div');
    bookBack.classList.add('book-back');
    
    const text = document.createElement('h2');
    text.innerText = `Are you sure you want to remove ${this.title} by ${this.author}?`;
    bookBack.appendChild(text);
    
    // confirm remove
    const confirmRemove = document.createElement('button');
    confirmRemove.innerText = 'Remove';
    confirmRemove.classList.add('button');
    confirmRemove.dataset.title = `${this.title}`;
    confirmRemove.addEventListener('click', (e) => this.confirmRemove(e, activeLibrary));
    bookBack.appendChild(confirmRemove);
    
    bookInner.appendChild(bookBack);
    thisBook.appendChild(bookInner);
    grid.appendChild(thisBook);
  }
  
  toggleRead = function(e, library) {
    const currentBook = library.content.find((book) => book.title == e.target.dataset.title);
    currentBook.isRead = currentBook.isRead ? false : true;
    library.renderBooks();
  }
  
  removeBook = function() {
    document.querySelector(`[data-title="${this.dataset.title}-book"]`).classList.add('book-flipped');
    document.querySelector(`[data-title="${this.dataset.title}-inner"]`).focus();
  }
  
  confirmRemove = function(e, library) {
    library.content = library.content.filter((book) => book.title != e.target.dataset.title);
    library.renderBooks();
  }
}

class Library {
  constructor(){
    this.content = []
  }
  
  renderBooks = function() {
    grid.innerHTML = ''
    this.content.forEach((book) => book.render());
    grid.appendChild(openAddBook);
  }
  
  addBookToLibrary = function(title, author, language, pages, isRead) {
    const newBook = new Book(title, author, language, pages, isRead)
    this.content.push(newBook);
    this.renderBooks();
  }
  
  cleanForm = function() {
    title.value = ''
    author.value = ''
    language.value = ''
    pages.value = ''
    isRead.checked = false
  }
}

let myClassLibrary = new Library();
let activeLibrary = myClassLibrary // Here I can show different libraries if I want to implement multiple ones

addBook.addEventListener('submit', (e) => {
  e.preventDefault();
  activeLibrary.addBookToLibrary(title.value, author.value, language.value, pages.value, isRead.checked);
  activeLibrary.cleanForm();
});

// sample book
activeLibrary.addBookToLibrary('Piense y hagase rico', 'Napleon Hill', 'Español', '263', false);