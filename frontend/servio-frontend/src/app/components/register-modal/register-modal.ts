import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  imports: [FormsModule],
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.css',
})

export class RegisterModal {
  username: string = '';
  email: string = '';
  password: string = '';

  @Output() closed = new EventEmitter<void>(); // this component emits an event "closed"
  @Output() registered = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.username, this.email, this.password)
      .subscribe({ // sends the HTTP request
        next: () => { // (callback) runs if backend responds with success
          this.registered.emit();
        },
        error: (err) => {
          console.log('HTTP ERROR OBJECT:', err);
          console.log('STATUS:', err.status);
          console.log('BACKEND MESSAGE:', err.error);

          alert(err.error?.error || 'Registration failed');
        }

      });
  }

  close() {
    this.closed.emit();
  }

}
