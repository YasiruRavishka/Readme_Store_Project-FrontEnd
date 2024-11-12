import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../service/user-cart/cart.service';
import { AccountService } from '../../../service/user-account/account.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private baseUrl : String = "http://localhost:8080";
  public cart: any;
  public user: any;
  public total : number = 0;

  constructor(private router:Router,private http:HttpClient,private accountService:AccountService,private cartService:CartService) {
    this.cart = this.cartService.savedCart;
    this.user = this.accountService.savedUser;
    if (this.user && !cartService.isEmptyCart()) {
      this.cart.forEach((item:any) => {
        item.price = item.qty * item.book.price;
        this.total += item.price;
      });
    } else {
      alert("Please, login!");
      router.navigate(["user/login"]);
    }
  }

  placeOrder(): void {
    if (!(this.cart && this.user) || this.total === 0) {
      alert("Error!");
      this.router.navigate([""]);
      return;
    }
    if (window.confirm("Do you want to continue?")) {
      const order = {
        user: this.user,
        items: this.cart
      };
      console.log(order);
      
      this.http.post(`${this.baseUrl}/order/place`, order).subscribe(data => {
        this.cartService.clearCart();
        alert("Order placed successfully.");
        this.router.navigate([""]);
      })
    }
  }
}
