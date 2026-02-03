import {Component, OnInit} from '@angular/core';
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
export class ProfileComponent implements OnInit {

  currentPassword = '';
  newPassword = '';

  currentPasswordError = '';
  successMessage = '';

  currentusername = '';
  newUsername = '';
  usernameError = '';
  usernameSuccess = '';

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

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.http.get<any>(
      'http://localhost:3000/users/me',
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    ).subscribe({
      next: (user) => {
        this.currentusername = user.username;
      },
      error: () => {
        console.error('Failed to load user data');
      }
    });
  }

  changeUsername() {
    this.usernameError = '';
    this.usernameSuccess = '';

    this.http.put(
      'http://localhost:3000/users/username',
      {
        newUsername: this.newUsername
      },
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    ).subscribe({
      next: () => {
        this.currentusername = this.newUsername;
        this.newUsername = '';
        this.usernameSuccess = 'Username updated successfully';
      },
      error: (err) => {
        if (err.status === 409) {
          this.usernameError = 'Username already taken';
        } else {
          this.usernameError = 'Failed to update username';
        }
      }
    });
  }
}
