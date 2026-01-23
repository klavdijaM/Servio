import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // angular HTTP API - allows GET, POST..

// service handles logic which is not UI related (data, backend communication)
// sends login and register data to the backend
@Injectable({
  providedIn: 'root' // singleton - one instance of the service for entire app
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // defines a base path

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
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email,
      password
    });
  }
}
