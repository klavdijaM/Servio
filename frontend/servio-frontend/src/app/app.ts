import { Component, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { RegisterModal } from './components/register-modal/register-modal';
import { RegistrationSuccessModal } from './components/registration-success-modal/registration-success-modal';
import {LoginModal} from './components/login-modal/login-modal';

// root UI component definition
@Component({
  selector: 'app-root', // this component will be rendered when app-root appears in html
  imports: [RegisterModal, LoginModal, RegistrationSuccessModal ], // what the component is allowed to use
  templateUrl: './app.html', // defines the location of the html for this component
  styleUrl: './app.css' // defines the location of css
})

// logic container
export class App {

  showRegisterModal = false;
  showLoginModal = false;
  showRegisterSuccess = false;

  constructor(public authService: AuthService) {}

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

}
