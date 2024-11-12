import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookItemComponent } from "../book-item/book-item.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,NgIf,NgFor,BookItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private baseUrl : String = "http://localhost:8080";
  public latestBookList:any;

  constructor(private http:HttpClient){
    this.loadLatestBook();  
  }

  loadLatestBook(): void {
    this.http.get(`${this.baseUrl}/book/latest/7`).subscribe((data:any)=>{
      if (data && data.length != 0) {
        this.latestBookList = data;
      }
    })
  }

}
