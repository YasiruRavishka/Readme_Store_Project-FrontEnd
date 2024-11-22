import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule,FormsModule,NgIf,NgFor],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.css'
})
export class BookManagementComponent implements OnInit{
  private baseUrl : String = "http://localhost:8080";
  public bookList : any = null;

  constructor(private http:HttpClient) {
    this.loadBooks();
  }
  ngOnInit(): void {
    import('flowbite').then((module) => {
      module.initFlowbite();
    });
  }

  loadBooks() : void {
    this.http.get(`${this.baseUrl}/book/all`).pipe(
      catchError(error => {
        this.bookList = null;
        alert("Server error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      if (this.isEmpty(data)) {
        this.bookList = null;
      } else {
        this.bookList = data;
      }
    })
  }

  public newBook : any = {}
  addNewBook() : void {
    this.http.post(`${this.baseUrl}/book`,this.newBook).pipe(
      catchError(error => {
        alert("Error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      this.loadBooks();
      this.newBook = {};
      alert("New book added.");
    })
  }

  public tempBook : any = {};
  setDataToModal(book : any) : void {
    this.tempBook = JSON.parse(JSON.stringify(book));
  }

  updateBook() : void {
    this.http.put(`${this.baseUrl}/book/update`,this.tempBook).pipe(
      catchError(error => {
        this.tempBook = {};
        alert("Error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      this.loadBooks();
      this.tempBook = {};
      alert("Book updated.");
    })
  }

  removeBook(book : any) : void {
    this.http.delete(`${this.baseUrl}/book/delete-by-id?id=${book.id}`).pipe(
      catchError(error => {
        alert("Error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      this.loadBooks();
      alert(`${book.name} (ID : ${book.id}) book has been removed.`);
    })
  }

  activateBook(book : any) : void {
    if (book.qtyOnHand < 1) {
      alert("Empty stock.")
      return;
    }
    book.isDisable = false;
    this.http.put(`${this.baseUrl}/book/update`, book).pipe(
      catchError(error => {
        alert("Error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      this.loadBooks();
      alert(`${book.name} (ID : ${book.id}) book has been activated.`);
    })
  }

  isEmpty(array : any) : Boolean {
    return !array || array.length == 0;
  }
}
