import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../service/user-account/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  public userEmail:any;
  public userPassword:any;

  constructor(private http: HttpClient, private accountService:AccountService) { }

  validEmail(): Boolean {
    return this.accountService.isValidEmail(this.userEmail);
  }
  
  private loginUser:any = {};
  login(): void {
    this.loginUser = {
      "email": this.userEmail,
      "password": this.userPassword,
    }
    this.accountService.userLogin(this.loginUser);
  }
}
