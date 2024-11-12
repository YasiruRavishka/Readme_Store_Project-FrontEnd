import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserType } from '../../../enum/UserType';
import { AccountService } from '../../../service/user-account/account.service';

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent implements OnInit{
  public accountType:UserType[] = [];
  public userType:UserType = UserType.USER;
  public userEmail:any;
  public userPassword:any;
  public userConfirmedPassword:any;

  constructor(private http: HttpClient, private accountService:AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccountTypes().subscribe(data => {
      this.accountType = data;
    });
  }

  changeAccountType(type:UserType): void {
    this.userType = type;
  }

  validPassword(): Boolean {
    return this.accountService.isValidPassword(this.userPassword,this.userConfirmedPassword);
  }

  validEmail(): Boolean {
    return this.accountService.isValidEmail(this.userEmail);
  }

  private signUpUser:any = {};
  signUp(): void {
    this.signUpUser = {
      "email": this.userEmail,
      "password": this.userConfirmedPassword,
      "type": this.userType
    };
    this.accountService.addNewUser(this.signUpUser);
  }
}
