import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../service/user-account/account.service';
import { NgIf } from '@angular/common';
import { UserType } from '../../enum/UserType';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public btnSwitchName : String = "Switch to admin";

  constructor(private router:Router,private accountService:AccountService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.toLowerCase().startsWith("/admin")) {
          this.btnSwitchName = "Switch to user";
        } else {
          this.btnSwitchName = "Switch to admin";
        }
      }
    });
  }

  isLogged(): Boolean {
    return this.accountService.savedUser != null;
  }

  isAdmin(): Boolean {
    return this.isLogged() && this.accountService.savedUser.type == UserType.ADMIN;
  }

  switchTo() {
    if (this.btnSwitchName === "Switch to admin") {
      this.router.navigate(["admin"]);
    } else {
      this.router.navigate([""]);
    }
  }

  logout(): void {
    this.accountService.userLogout();
  }
}
