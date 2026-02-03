import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {
  username = '';
  currentPassword = '';
  newPassword = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  changePassword() {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.put(
      'http://localhost:3000/users/password',
      {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      },
      {
        headers: {
          // used to identify the user based on their token
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    ).subscribe({
      next: () => {
        this.successMessage = 'Password updated successfully';
        this.currentPassword = '';
        this.newPassword = '';
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Current password is not correct';
        } else {
          this.errorMessage = 'Failed to update password';
        }
      }
    });
  }
}
