import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';
import {Voucher, VoucherService} from '../../services/voucher.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})

export class CheckoutComponent implements OnInit {

  items: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 0;
  total = 0;

  restaurant: Restaurant | null = null;

  voucherCode = '';
  voucherError = '';
  appliedVoucher: Voucher | null = null;
  discountAmount = 0;


  constructor(
    private cartService: CartService,
    private restaurantService: RestaurantService,
    private voucherService: VoucherService,
    private cdr: ChangeDetectorRef,
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
        this.cdr.detectChanges();
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
    alert('Order placed successfully!');
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

  applyVoucher() {
    // reset previous state if user tried out multiple vouchers
    this.voucherError = '';
    this.discountAmount = 0;

    if (!this.voucherCode.trim()) {
      this.voucherError = 'Please enter a voucher code';
      return;
    }

    this.voucherService.validateVoucher(this.voucherCode.trim())
      .subscribe({ // sends the HTTP post request to backend
        next: (response) => { // backend responds successfully
          if (!response.valid) {
            this.voucherError = response.reason ?? 'Invalid voucher';
            this.appliedVoucher = null;
            this.recalculateTotal(); // no voucher discount anymore - we revert total
            this.cdr.detectChanges();
            return;
          }

          this.appliedVoucher = response.voucher!;
          this.calculateDiscount();
          this.cdr.detectChanges();
        },
        error: () => {
          this.voucherError = 'Failed to validate voucher';
        }
      });
  }

  private calculateDiscount() {
    if (!this.appliedVoucher) return;

    if (this.appliedVoucher.discount_type === 'percentage') {
      this.discountAmount =
        (this.subtotal * this.appliedVoucher.discount_value) / 100;
    }

    if (this.appliedVoucher.discount_type === 'fixed') {
      this.discountAmount = this.appliedVoucher.discount_value;
    }

    if (this.appliedVoucher.discount_type === 'free_delivery') {
      this.discountAmount = this.deliveryFee;
    }

    this.recalculateTotal();
  }


  private recalculateTotal() {
    this.total =
      this.subtotal +
      this.deliveryFee -
      this.discountAmount;

    if (this.total < 0) {
      this.total = 0;
    }
  }


}
