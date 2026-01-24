import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // angular HTTP API - allows GET, POST..

// service handles logic which is not UI related (data, backend communication)
// sends login and register data to the backend
@Injectable({
  providedIn: 'root'// singleton - one instance of the service for entire app
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // defines a base path
  private TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {} // HttpClient builds http requests

  register(username: string, email: string, password: string) {
    // returns an Observable
    return this.http.post(`${this.apiUrl}/register`, { // req body
      username,
      email,
      password
    });
  }

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, { // request will be sent when someone subscribes
      email,
      password
    });
  }

  storeToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean{
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
