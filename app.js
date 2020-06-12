//book class
class Book{
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn =  isbn;

  }
}

//  UI class: Handles UI class
class UI{
  static displayBooks(){
    const books = Store.getBooks();
    
    books.forEach((book)=>UI.addBookToList(book))
  }

  static addBookToList(book){
    //grabbing the book list container
    const list = document.querySelector("#book-list");
    //creating the row for each book
    const row = document.createElement("tr");
    //add html to row
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    
    `;

    //append row to the list
    list.appendChild(row);
  }

  static deleteBook(el){

    if(el.classList.contains("delete")){
       
      el.parentElement.parentElement.remove();
    }

  }

  static showAlert(msg, className){

    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container =  document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    //vanish in 3sec
    setTimeout(()=> document.querySelector(".alert").remove(),1000);
  }





  static clearFields(){
    document.querySelector("#title").value= " ";
    document.querySelector("#author").value= " ";
    document.querySelector("#isbn").value= " ";
  }
}

//store class:Handles stoarage
class Store{

  static getBooks(){
    //you can't store objects ib local storage, it has to be a string
    let books;
   if(localStorage.getItem('books')===''){

    books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;

  }

  static addBook(book){

    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));


  }

  static removeBook(isbn){

    const books = Store.getBooks();

    books.forEach((book, index)=>{
      if(book.isbn === isbn){
        books.splice(index,1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));

  }
}

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event : Add a book
const bookAdd = document.querySelector("#book-form");
bookAdd.addEventListener("submit",(e)=>{
  //prevent default submit
  e.preventDefault();
  //get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate
  if(title === ''|| author === '' || isbn === ''){
    UI.showAlert("please fill in all the details","danger");
  }else{
    //instatiate a book
  const book = new Book(title, author, isbn);

  //add book to the list
  UI.addBookToList(book);

  //add book to local storage
  Store.addBook(book);

  //succes  message
  UI.showAlert("book Added","success")

  //clear all fields
  UI.clearFields();

  }

  


})

//Event: delete a book
r = document.querySelector("#book-list");
r.addEventListener('click',(e)=>{

  //remove book from UI
    UI.deleteBook(e.target); 

  //remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

     //delete book alert
  UI.showAlert("book deleted","success")
  })


