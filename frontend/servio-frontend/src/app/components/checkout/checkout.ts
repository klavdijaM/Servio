import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})

export class CheckoutComponent implements OnInit {

  items: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 0;
  total = 0;

  restaurant: Restaurant | null = null;

  constructor(
    private cartService: CartService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  // called when user navigates to /checkout
  ngOnInit() {
    this.items = this.cartService.items; // getter => returns current cart array stored in service
    this.subtotal = this.cartService.getTotal();
    const restaurantId = this.cartService.getRestaurantId(); // checks which restaurant the order belongs to

    if (!restaurantId) {
      // if there is no cart, go back to homepage
      this.router.navigate(['/']);
      return;
    }

    this.restaurantService.getRestaurantById(restaurantId).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
        this.deliveryFee = restaurant.delivery_fee;
        this.total = this.subtotal + this.deliveryFee;
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  goBackToCart() {
    this.router.navigate(['/']);
  }

  placeOrder() {
    // TEMPORARY
    alert('Order placed');
  }
}
