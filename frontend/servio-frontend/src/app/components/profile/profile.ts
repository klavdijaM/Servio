import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

  currentUsername = '';
  newUsername = '';
  usernameError = '';
  usernameSuccess = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  changePassword(form: any) {
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
        form.resetForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.currentPasswordError = '';
        if (err.status === 401) {
          this.currentPasswordError = 'Current password is not correct';
          this.cdr.detectChanges();
        } else {
          this.currentPasswordError = 'Failed to update password';
          this.cdr.detectChanges();
        }
      }
    });
  }

  ngOnInit() {
    console.log('ProfileComponent INIT');
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
        this.currentUsername = user.username;
        this.cdr.detectChanges();
      },
      error: () => {
        console.error('Failed to load user data');
      }
    });
  }

  changeUsername(form: any) {
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
        this.currentUsername = this.newUsername;
        this.usernameSuccess = 'Username updated successfully';
        form.resetForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 409) {
          this.usernameError = 'Username already taken';
          this.cdr.detectChanges();
        } else {
          this.usernameError = 'Failed to update username';
          this.cdr.detectChanges();
        }
      }
    });
  }
}
