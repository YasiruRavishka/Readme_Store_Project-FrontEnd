import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountType } from '../../enum/account-type';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../local-storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl : String = "http://localhost:8080";
  public savedUser:any = null;

  constructor(private router:Router, private http:HttpClient, private storage:StorageService) {
    this.loadUser();
  }

  getAccountTypes(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>(`${this.baseUrl}/user/all-types`);
  }

  isValidPassword(userPassword:any, userConfirmedPassword:any): Boolean {
    return userPassword && userPassword === userConfirmedPassword;
  }

  isValidEmail(userEmail:any): Boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(userEmail);
  }

  changePassword(updateUser: any) {
    this.http.put(`${this.baseUrl}/user/update`,updateUser).pipe(
      catchError(error => {
        alert("Update error!!");
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data => {
      alert("Profile updated!!");
      this.forcedLogout();
    });
  }

  addNewUser(signUpUser:any): void {
    this.http.post(`${this.baseUrl}/user`,signUpUser).pipe(
      catchError(error => {
        alert("Email is already exists.");
        this.router.navigate([""]);
        return throwError(() => new Error('Error fetching data.'));
      })
    ).subscribe(data => {
      alert("New User added!!");
      this.router.navigate(["/user/login"]);
    });
  }

  loadUser(): void {
    this.savedUser = this.storage.getFromLocalStorage("savedUser");
    if (this.savedUser == null) {
      return;
    }
    this.http.get(`${this.baseUrl}/user/valid?email=${this.savedUser.email}&password=${this.savedUser.password}`).subscribe(data => {
      if (data == null) {
        this.forcedLogout();
      } else {
        this.savedUser = data;
        this.storage.saveToLocalStorage("savedUser", this.savedUser);
        this.router.navigate([""]);
      }
    });
  }

  userLogin(loginUser:any): void {
    this.http.get(`${this.baseUrl}/user/valid?email=${loginUser.email}&password=${loginUser.password}`).subscribe(data => {
      if (data == null) {
        alert("Invalid email or password.");
        throwError(() => new Error('Error fetching data.'));
      } else {
        this.savedUser = data;
        this.storage.saveToLocalStorage("savedUser", this.savedUser);
        alert("Login successfull.");
        this.router.navigate([""]);
      }
    });
  }

  userLogout(): void {
    if (window.confirm("Are you want to logout?")) {
      this.forcedLogout();
    }
  }

  private forcedLogout(): void {
    this.savedUser = null;
    this.storage.removeFromLocalStorage("savedUser");
    this.router.navigate([""]);
  }
}
