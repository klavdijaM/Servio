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
  email: string = '';
  password: string = '';

  @Output() closed = new EventEmitter<void>(); // this component emits an event "closed"

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.email, this.password)
      .subscribe({ // sends the HTTP request
        next: () => { // (callback) runs if backend responds with success
          alert('Registration successful');
          this.close();
        },
        error: (err) => {
          alert('Registration failed');
          console.error(err);
        }
      });
  }

  close() {
    this.closed.emit();
  }

}
