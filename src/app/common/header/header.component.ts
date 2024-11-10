import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../service/user-account/account.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private accountService:AccountService) { }

  isLogged(): Boolean {
    return this.accountService.savedUser != null;
  }

  logout(): void {
    this.accountService.userLogout();
  }
}
