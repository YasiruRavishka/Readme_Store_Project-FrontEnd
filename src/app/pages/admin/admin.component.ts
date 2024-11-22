import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../service/user-account/account.service';
import { UserType } from '../../enum/UserType';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private router:Router,private accountService:AccountService) {
    accountService.loadUser();
    if (accountService.savedUser.type != UserType.ADMIN) {
      router.navigate([""]);
      alert("Invalid user profile!");
    }
  }
}
