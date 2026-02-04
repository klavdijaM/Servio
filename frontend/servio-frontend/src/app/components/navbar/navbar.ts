import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CartDropdownComponent} from '../cart-dropdown/cart-dropdown';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, CartDropdownComponent],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  isCartOpen = false;

  constructor(
    public authService: AuthService, // public to make it accessible in html
    private router: Router,
    public cartService: CartService) {}

  goToProfile() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  get cartCount(): number {
    return this.cartService.getItemCount();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

}
