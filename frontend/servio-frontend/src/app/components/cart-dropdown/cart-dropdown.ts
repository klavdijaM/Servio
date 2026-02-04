import {Component, OnInit, OnDestroy, Input, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../../services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-dropdown.html',
  styleUrl: './cart-dropdown.css'
})
export class CartDropdownComponent implements OnInit, OnDestroy {

  // Whether the dropdown is visible (controlled by navbar)
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();


  // Cart items currently in the cart
  items: CartItem[] = [];

  // Total price of the cart
  total = 0;

  private cartSub?: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  // called when the component is created
  ngOnInit() {
    // Subscribe to cart changes
    this.cartSub = this.cartService.items$.subscribe(items => { // every time a new value is emitted, the callback runs
      this.items = items; // UI list gets updated
      this.total = this.cartService.getTotal(); // recomputed every time the cart changes
    });
  }

  // called when component is removed from DOM
  ngOnDestroy() {
    this.cartSub?.unsubscribe();
  }

  increase(item: CartItem) {
    this.cartService.addItem(item);
  }

  decrease(item: CartItem) {
    this.cartService.removeItem(item.dishId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }

  goToCheckout() {
    this.close.emit(); // emits a close event to the parent (navbar)
    this.router.navigate(['/checkout']);
  }

}
