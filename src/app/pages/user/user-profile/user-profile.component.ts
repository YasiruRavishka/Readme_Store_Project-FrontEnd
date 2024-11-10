import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountService } from '../../../service/user-account/account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  public userEmail:any;
  public userType:any;
  public userPassword:any;
  public userConfirmedPassword:any;

  constructor(private accountService:AccountService, private http : HttpClient) {
    this.userEmail = accountService.savedUser.email;
    this.userType = accountService.savedUser.type;
  }

  validPassword(): Boolean {
    return this.accountService.isValidPassword(this.userPassword,this.userConfirmedPassword);
  }

  private updateUser:any = {};
  changePassword() {
    this.updateUser = {
      "id": this.accountService.savedUser.id,
      "email": this.accountService.savedUser.email,
      "password": this.userConfirmedPassword,
      "type": this.accountService.savedUser.type,
      "isDisable": this.accountService.savedUser.isDisable
    }
    if (this.accountService.savedUser.password != this.updateUser.password) {
      this.accountService.changePassword(this.updateUser);
    } else {
      alert("Password didn't change.");
    }
  }
}
