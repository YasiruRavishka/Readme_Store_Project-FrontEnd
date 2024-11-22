import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { BookItemComponent } from "../book-item/book-item.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [NgFor,NgIf,BookItemComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit{
  private baseUrl : String = "http://localhost:8080";
  public searchText : String = "";
  public bookList : any = null;

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchText = params['searchText'];
      this.loadBookList();
    });
  }

  loadBookList() : void {
    if (!this.searchText || this.searchText === "") {
      this.http.get(`${this.baseUrl}/book/all`).pipe(
        catchError(error => {
          this.bookList = null;
          alert("Server error!!");
          return throwError(() => new Error('Error fetching data.'));
        })
      ).subscribe((data : any) => {
        if (this.isEmpty(data)) {
          this.bookList = null;
        } else {
          this.bookList = data;
        }
      });
    } else {
      this.http.get(`${this.baseUrl}/book/search-by-name?name=${this.searchText}`).pipe(
        catchError(error => {
          this.bookList = null;
          alert("Server error!!");
          return throwError(() => new Error('Error fetching data.'));
        })
      ).subscribe((data : any) => {
        if (this.isEmpty(data)) {
          this.bookList = null;
        } else {
          this.bookList = data;
        }
      });
    }
  }

  isEmpty(array : any) : Boolean {
    return !array || array.length == 0;
  }
}
