import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterModal } from './components/register-modal/register-modal';
import {LoginModal} from './components/login-modal/login-modal';

// root UI component definition
@Component({
  selector: 'app-root', // this component will be rendered when app-root appears in html
  imports: [RegisterModal, LoginModal ], // what the component is allowed to use
  templateUrl: './app.html', // defines the location of the html for this component
  styleUrl: './app.css' // defines the location of css
})

// logic container
export class App {

  showRegisterModal = false;
  showLoginModal = false;

  openRegister() {
    this.showRegisterModal = true;
  }

  closeRegister() {
    this.showRegisterModal = false;
  }

  openLogin() {
    this.showLoginModal = true;
  }

  closeLogin() {
    this.showLoginModal = false;
  }

}
