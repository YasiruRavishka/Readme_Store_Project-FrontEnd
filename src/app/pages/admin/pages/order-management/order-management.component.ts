import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor,NgIf],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css'
})
export class OrderManagementComponent {
  private baseUrl : String = "http://localhost:8080";
  public orderList : any = null;

  constructor(private http:HttpClient) {
    this.loadOrders();
  }

  loadOrders() : void {
    this.http.get(`${this.baseUrl}/order/all`).pipe(
      catchError(error => {
        this.orderList = null;
        alert("Server error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      if (this.isEmpty(data)) {
        this.orderList = null;
      } else {
        this.orderList = data;
      }
    })
  }

  public tempOrder : any = {}
  setDataToModal(order : any) : void {
    this.tempOrder = order;
  }

  isEmpty(array : any) : Boolean {
    return !array || array.length == 0;
  }
}
