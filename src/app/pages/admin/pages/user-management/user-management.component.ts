import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule,FormsModule,NgFor,NgIf],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  private baseUrl : String = "http://localhost:8080";
  public userList : any = null;

  constructor(private http:HttpClient) {
    this.loadUsers();
  }
  ngOnInit(): void {
    import('flowbite').then((module) => {
      module.initFlowbite();
    });
  }

  loadUsers() : void {
    this.http.get(`${this.baseUrl}/user/all`).pipe(
      catchError(error => {
        this.userList = null;
        alert("Server error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      if (this.isEmpty(data)) {
        this.userList = null;
      } else {
        this.userList = data;
      }
    })
  }

  removeUser(user : any) : void {
    this.http.delete(`${this.baseUrl}/user/delete-by-id?id=${user.id}`).pipe(
      catchError(error => {
        alert("Error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      this.loadUsers();
      alert(`${user.email} (ID : ${user.id}) user has been removed.`);
    })
  }

  activateUser(user : any) : void {
    user.isDisable = false;
    this.http.put(`${this.baseUrl}/user/update`, user).pipe(
      catchError(error => {
        alert("Error!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data=>{
      this.loadUsers();
      alert(`${user.email} (ID : ${user.id}) user has been activated.`);
    })
  }

  isEmpty(array : any) : Boolean {
    return !array || array.length == 0;
  }
}
