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

  constructor(private cartService:CartService) {}

  add():void {
    const item = {
      book: this.book,
      qty: 1,
      price: this.book.price
    }
    this.cartService.addToCart(item);
  }
}
