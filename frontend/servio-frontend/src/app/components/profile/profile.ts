import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {
  username = '';
  currentPassword = '';
  newPassword = '';

  currentPasswordError = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  changePassword() {
    this.currentPasswordError = '';
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
        this.currentPasswordError = '';
        if (err.status === 401) {
          this.currentPasswordError = 'Current password is not correct';
        } else {
          this.currentPasswordError = 'Failed to update password';
        }
      }
    });
  }
}
