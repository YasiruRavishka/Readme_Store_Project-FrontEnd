import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AccountService } from '../../../service/user-account/account.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {
  public orderList : any;
  public currentOrderItems : any;

  constructor(private accountService:AccountService) {
    accountService.loadUser();
    this.orderList = accountService.savedUser.orders;
  }

  isEmptyList(): boolean {
    return !this.orderList || this.orderList.length == 0;
  }

  setCurrentOrderItems(orderItems:any): void {
    this.currentOrderItems = orderItems;
  }
}
