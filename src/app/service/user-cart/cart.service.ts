import { Injectable } from '@angular/core';
import { StorageService } from '../local-storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public savedCart: any = null;

  constructor(private storage:StorageService, private router:Router) {
    this.loadCart();
  }

  isEmptyCart(): boolean {
    return !this.savedCart || this.savedCart.length == 0;
  }

  addToCart(item:any): void {
    this.loadCart();
    if (this.savedCart != null) {
      this.removeItemFromCart(item);
      this.savedCart.push(item);
    } else {
      this.savedCart = [item];
    }
    this.storage.saveToLocalStorage("savedCart",this.savedCart);
  }

  removeItemFromCart(item:any): void {
    const index = this.savedCart.findIndex((cartItem: any) => cartItem.book.id === item.book.id);
    if (index !== -1) {
      this.savedCart.splice(index,1);
      this.storage.saveToLocalStorage("savedCart",this.savedCart);
    }
  }

  checkout(): void {
    this.storage.saveToLocalStorage("savedCart",this.savedCart);
    this.router.navigate(["user/checkout"]);
  }

  clearCart(): void {
    this.storage.removeFromLocalStorage("savedCart");
    this.loadCart();
  }

  loadCart(): void {
    this.savedCart = this.storage.getFromLocalStorage("savedCart");
    if (this.isEmptyCart()) {
      this.savedCart = null;
    }
  }
}
