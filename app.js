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
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }
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

  static deleteBook(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }

  //Bootstrap validation method built in JS
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    //Make dissapear in x seconds
    setTimeout(() => document.querySelector('.alert').remove(), 1500);
  }

  //Sorting function itself
  static sortTable(col) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementsByClassName("table")[0];
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[col];
        y = rows[i + 1].getElementsByTagName("TD")[col];
        //check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

}

//Local Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, i) => {
      if (book.isbn === isbn) {
        books.splice(i, 1);
        //Show deleted message
        UI.showAlert('Book deleted!', 'warning');
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
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
    UI.showAlert("No field can be left empty!", "danger");
  } else {
    //Instatiate book
    const book = new Book(title, author, isbn);
    //Add book to UI
    UI.addBookToList(book);
    //Add book to Storage
    Store.addBook(book);
    //Show success message
    UI.showAlert('Book added!', 'success');
    //Clear fields
    UI.clearFields();
  }
});

//Remove a book (event propagation: target the whole list and delete the grandparent)
document.querySelector('#book-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete') && confirm("Are you sure you want to delete " + e.target.parentElement.parentElement.childNodes[1].innerText + "?")) {
    UI.deleteBook(e.target);
    //Remove book from Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  }
});

//Sort by clicking table heading
tabHead = document.getElementsByTagName('th');
for (let col = 0; col < tabHead.length - 1; col++) {
  tabHead[col].addEventListener('click', () => {
    UI.sortTable(col);
  });
}
