import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  delivery_fee: number;
  minimum_order_value: number;
  delivery_time: number;
  rating: number | null;
  rating_count: number;
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

  getRestaurantById(id: number) {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  getCategoriesByRestaurant(restaurantId: number) {
    return this.http.get<{ id: number; name: string }[]>(
      `${this.apiUrl}/${restaurantId}/categories`
    );
  }

  getDishesByCategory(restaurantId: number, categoryId: number) {
    return this.http.get<{ id: number; name: string; description: string; price: number }[]>(
      `${this.apiUrl}/${restaurantId}/categories/${categoryId}/dishes`
    );
  }

}
