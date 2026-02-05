import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { OrderService, Order, OrderItem } from '../../services/order.service';
import {Restaurant, RestaurantService} from '../../services/restaurant.service';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-page.html',
  styleUrl: './order-page.css'
})

export class OrderPageComponent implements OnInit, OnDestroy {

  order: Order | null = null; // holds the order obj, starts as null
  items: OrderItem[] = []; // all items in the order
  statusText = '';

  restaurant: Restaurant | null = null;

  estimatedDeliveryTime: Date | null = null;
  remainingMinutes = 0;
  createdAtLocal: Date | null = null;


  private intervalId?: number; // needed to stop the timer

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private restaurantService: RestaurantService,
  ) {}

  // runs once when user navigates to /orders/:id
  ngOnInit() {
    const orderIdParam = this.route.snapshot.paramMap.get('id');

    if (!orderIdParam) {
      this.router.navigate(['/']);
      return;
    }

    const orderId = Number(orderIdParam);

    this.orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.order = response.order; // order metadata
        this.items = response.items; // list of dishes
        this.loadRestaurantAndSetupTimer(); // calculates delivery time
        this.cdr.detectChanges();
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  // runs when user leaves the page or component is destroyed
  ngOnDestroy() {
    // clears the interval => stops the timer
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private loadRestaurantAndSetupTimer() {
    if (!this.order) return;

    this.restaurantService
      .getRestaurantById(this.order.restaurant_id)
      .subscribe({
        next: (restaurant) => {
          this.restaurant = restaurant;
          this.setupDeliveryTimer();
          this.cdr.detectChanges();
        },
        error: () => {
          this.router.navigate(['/']);
        }
      });
  }

  private setupDeliveryTimer() {
    if (!this.order || !this.restaurant) return;

    // when the order was created => turns the text string returned by backend into js object
    const createdAt = new Date(this.order.created_at + 'Z');
    this.createdAtLocal = createdAt;

    // when the food should arrive => in milliseconds
    this.estimatedDeliveryTime = new Date(
      createdAt.getTime() + this.restaurant.delivery_time * 60000
    );

    this.updateRemainingTime(); // calculates how many minutes are left from order creation

    // recalculates remaining time every 60 seconds
    this.intervalId = window.setInterval(() => {
      this.updateRemainingTime();
    }, 60000);
  }

  private updateRemainingTime() {
    if (!this.estimatedDeliveryTime) return;

    const now = new Date(); // current time

    // difference in milliseconds
    const diffMs =
      this.estimatedDeliveryTime.getTime() - now.getTime();

    this.remainingMinutes = Math.max( // ensures the value doesn't go bellow 0 (no negative left over time allowed)
      Math.ceil(diffMs / 60000), // converts milliseconds back to sec
      0
    );

    if (this.remainingMinutes > 20) {
      this.statusText = 'Order received';
    } else if (this.remainingMinutes > 10) {
      this.statusText = 'Preparing food';
    } else if (this.remainingMinutes > 0) {
      this.statusText = 'Out for delivery';
    } else {
      this.statusText = 'Delivered';

      // Stop timer once delivered
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  }
}
