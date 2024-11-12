import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../service/user-cart/cart.service';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, NgFor],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent {
  public cart:any = null;

  constructor(private http:HttpClient, private cartService:CartService) {
    this.loadCart();
  }

  isEmptyCart(): boolean {
    return this.cartService.isEmptyCart();
  }

  loadCart(): void {
    this.cart = this.cartService.savedCart;
    console.log(this.cart);
  }

  removeItemFromCart(item:any): void {
    this.cartService.removeItemFromCart(item);
    this.loadCart();
  }

  checkout(): void {
    if (window.confirm("Do you want to continue?")) {
      this.cartService.checkout();
    }
  }
}
