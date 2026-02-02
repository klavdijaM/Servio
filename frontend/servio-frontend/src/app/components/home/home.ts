import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';

import { RegisterModal } from '../register-modal/register-modal';
import { RegistrationSuccessModal } from '../registration-success-modal/registration-success-modal';
import { LoginModal } from '../login-modal/login-modal';
import { CuisineCategoriesComponent } from '../cuisine-categories/cuisine-categories';
import { RestaurantsListComponent } from '../restaurant-list/restaurant-list';
import { RestaurantFilters, RestaurantFiltersComponent } from '../restaurant-filters/restaurant-filters';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RegisterModal,
    LoginModal,
    RegistrationSuccessModal,
    CuisineCategoriesComponent,
    RestaurantsListComponent,
    RestaurantFiltersComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  showRegisterModal = false;
  showLoginModal = false;
  showRegisterSuccess = false;

  restaurants: Restaurant[] = [];
  allRestaurants: Restaurant[] = [];
  showFiltersModal = false;

  activeFilters: RestaurantFilters = {
    freeDelivery: false,
    maxDeliveryTime: null,
    minRating: null,
    maxMinOrder: null
  };

  constructor(
    public authService: AuthService,
    private restaurantService: RestaurantService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe({
      next: data => {
        this.allRestaurants = data;
        this.restaurants = data;
        this.cdr.detectChanges();
      }
    });
  }

  openRegister() { this.showRegisterModal = true; }
  closeRegister() { this.showRegisterModal = false; }
  openLogin() { this.showLoginModal = true; }
  closeLogin() { this.showLoginModal = false; }
  logout() { this.authService.logout(); }

  handleRegistrationSuccess() {
    this.showRegisterModal = false;
    this.showRegisterSuccess = true;
  }

  goToLoginFromSuccess() {
    this.showRegisterSuccess = false;
    this.showLoginModal = true;
  }

  onCuisineSelected(cuisine: string) {
    this.restaurants = this.allRestaurants.filter(r => r.cuisine === cuisine);
  }

  onFiltersChanged(filters: RestaurantFilters) {
    this.restaurants = this.allRestaurants.filter(r => {
      if (filters.freeDelivery && r.delivery_fee !== 0) return false;
      if (filters.maxDeliveryTime !== null && r.delivery_time > filters.maxDeliveryTime) return false;
      if (filters.minRating !== null && (r.rating === null || r.rating < filters.minRating)) return false;
      if (filters.maxMinOrder !== null && r.minimum_order_value > filters.maxMinOrder) return false;
      return true;
    });
  }

  toggleFilters() {
    this.showFiltersModal = !this.showFiltersModal;
  }

  applyMobileFilters() {
    this.onFiltersChanged(this.activeFilters);
    this.showFiltersModal = false;
  }
}
