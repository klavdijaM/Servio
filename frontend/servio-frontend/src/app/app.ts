import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RegisterModal } from './components/register-modal/register-modal';
import { RegistrationSuccessModal } from './components/registration-success-modal/registration-success-modal';
import {LoginModal} from './components/login-modal/login-modal';
import {CuisineCategoriesComponent} from './components/cuisine-categories/cuisine-categories';
import { RestaurantService, Restaurant } from './services/restaurant.service';
import { RestaurantsListComponent } from './components/restaurant-list/restaurant-list';
import { CommonModule } from '@angular/common';
import {RestaurantFilters, RestaurantFiltersComponent} from './components/restaurant-filters/restaurant-filters';


// root UI component definition
@Component({
  selector: 'app-root', // this component will be rendered when app-root appears in html
  standalone: true,
  imports: [CommonModule, RegisterModal, LoginModal, RegistrationSuccessModal, CuisineCategoriesComponent, RestaurantsListComponent, RestaurantFiltersComponent  ], // what the component is allowed to use
  templateUrl: './app.html', // defines the location of the html for this component
  styleUrl: './app.css' // defines the location of css
})

// business logic container
export class App implements OnInit {

  showRegisterModal = false;
  showLoginModal = false;
  showRegisterSuccess = false;
  restaurants: Restaurant[] = [];
  allRestaurants: Restaurant[] = []; // full, unfiltered list
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

  ngOnInit() { // runs once when app loads
    console.log('App initialized');

    this.restaurantService.getRestaurants().subscribe({
      next: (data) => {
        console.log('Restaurants from backend:', data);
        this.allRestaurants = data; // store original list from backend
        this.restaurants = data; // show all restaurants initially
        this.cdr.detectChanges(); // refreshes the ui when data changes (when we get restaurants from backend)
      },
      error: (err) => {
        console.error('Failed to load restaurants', err);
      }
    });
  }

  openRegister() {
    this.showRegisterModal = true;
  }

  closeRegister() {
    this.showRegisterModal = false;
  }

  handleRegistrationSuccess() {
    this.showRegisterModal = false;
    this.showRegisterSuccess = true;
  }

  goToLoginFromSuccess() {
    this.showRegisterSuccess = false;
    this.showLoginModal = true;
  }

  openLogin() {
    this.showLoginModal = true;
  }

  closeLogin() {
    this.showLoginModal = false;
  }

  logout() {
    this.authService.logout();
  }

  onCuisineSelected(cuisine: string) {
    this.restaurants = this.allRestaurants.filter(
      restaurant => restaurant.cuisine === cuisine
    );
  }

  onFiltersChanged(filters: RestaurantFilters) {
    this.restaurants = this.allRestaurants.filter(restaurant => {

      if (filters.freeDelivery && restaurant.delivery_fee !== 0) {
        return false;
      }

      if (
        filters.maxDeliveryTime !== null &&
        restaurant.delivery_time > filters.maxDeliveryTime
      ) {
        return false;
      }

      if (
        filters.minRating !== null &&
        (restaurant.rating === null || restaurant.rating < filters.minRating)
      ) {
        return false;
      }

      if (
        filters.maxMinOrder !== null &&
        restaurant.minimum_order_value > filters.maxMinOrder
      ) {
        return false;
      }

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
