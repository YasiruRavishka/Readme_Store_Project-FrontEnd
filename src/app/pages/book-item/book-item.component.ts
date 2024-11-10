import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../service/user-cart/cart.service';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [NgIf],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {
  @Input() book:any;
  private qty : number = 0;

  constructor(private cartService:CartService) {}

  add():void {
    this.qty = (this.qty<this.book.qtyOnHand)? ++this.qty : this.book.qtyOnHand;
    const item = {
      book: this.book,
      qty: this.qty,
      price: this.book.price * this.qty
    }
    this.cartService.addToCart(item);
  }
}
