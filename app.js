//Representation of a Book
class Book {
  constructor(title, author, isbn) {
    Object.assign(this, {title, author, isbn});
    // same thing as above:
    // this.title = title;
    // this.author = author;
    // this.isbn = isbn;
  }
}

//Handling UI tasks
class UI {
  // static displayBooks() {
  //   const StoredBooks = [
  //     {
  //       title: 'Book 1',
  //       author: 'author 1',
  //       isbn: '1111'
  //     },
  //     {
  //       title: 'Book 2',
  //       author: 'author 2',
  //       isbn: '2222'
  //     }
  //   ];
  //   const books = StoredBooks;
  //   books.forEach((book) => UI.addBookToList(book));
  // }
  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-warning btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static clearFields() {
    const title = document.querySelector('#title').value = "";
    const author = document.querySelector('#author').value = "";
    const isbn = document.querySelector('#isbn').value = "";
  }

  static deleteBook(element ) {
    if(element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }

  //Bootstrap validation methos built in JS
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    //Make dissapear in x seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }
}

//Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
//Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  //Validate
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert("one filed is empty", "danger");
  } else {
    //Instatiate book
    const booka = new Book(title, author, isbn);
    //Add book to UI
    UI.addBookToList(booka);
    //Show success message
    UI.showAlert('Book added!', 'success');
    //Clear fields
    UI.clearFields();
  }
});

//Remove a book (event propagation: target the whole list and delete the grandparent)
document.querySelector('#book-list').addEventListener('click', (e) =>{
  UI.deleteBook(e.target);
  //Show deleted message
  UI.showAlert('Book deleted!', 'warning');
});

//Local Storage
class Store {
  static getBooks() {

  }
  static addBook(book) {

  }
  static removeBook(isbn) {

  }
}
