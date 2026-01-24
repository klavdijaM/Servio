import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  imports: [FormsModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
})
export class LoginModal {
  email: string = '';
  password: string = '';

  @Output() closed = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        // add token authentication logic
        this.close();
      },
      error: (err) => {
        alert(err.error?.error || 'Login failed.');
      }
    })
  }

  close(){
    this.closed.emit();
  }



}
