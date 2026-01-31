import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Restaurant { // matches the structure of the restaurant obj from backend
  id: number;
  name: string;
  cuisine: string;
  delivery_fee: number;
  minimum_order_value: number;
}

// fetches restaurants from backend
@Injectable({
  providedIn: 'root' // one instance of the class
})
export class RestaurantService {
  private apiUrl = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  // creates the http GET request (observable) => doesn't send it yet
  getRestaurants() {
    return this.http.get<Restaurant[]>(this.apiUrl); // returns array of restaurant objects
  }
}
