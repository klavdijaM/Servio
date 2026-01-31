import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RegisterModal } from './components/register-modal/register-modal';
import { RegistrationSuccessModal } from './components/registration-success-modal/registration-success-modal';
import {LoginModal} from './components/login-modal/login-modal';
import {CuisineCategoriesComponent} from './components/cuisine-categories/cuisine-categories';
import { RestaurantService, Restaurant } from './services/restaurant.service';
import { RestaurantsListComponent } from './components/restaurant-list/restaurant-list';


// root UI component definition
@Component({
  selector: 'app-root', // this component will be rendered when app-root appears in html
  imports: [RegisterModal, LoginModal, RegistrationSuccessModal, CuisineCategoriesComponent, RestaurantsListComponent ], // what the component is allowed to use
  templateUrl: './app.html', // defines the location of the html for this component
  styleUrl: './app.css' // defines the location of css
})

// logic container
export class App implements OnInit {

  showRegisterModal = false;
  showLoginModal = false;
  showRegisterSuccess = false;
  restaurants: Restaurant[] = [];

  constructor(
    public authService: AuthService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() { // runs once when app loads
    this.restaurantService.getRestaurants().subscribe({ // sends the http request
      next: (data) => {
        this.restaurants = data;
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
    console.log('Selected cuisine:', cuisine);
  }


}
