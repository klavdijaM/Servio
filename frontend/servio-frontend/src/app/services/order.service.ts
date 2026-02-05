import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// represents one line (item) in an order
export interface OrderItem {
  dish_id: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  restaurant_id: number;
  status: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  createOrder(payload: { // the data we send to backend
    restaurantId: number;
    items: {
      dishId: number;
      quantity: number;
      price: number;
    }[];
    voucherId?: number | null;
  }) {
    return this.http.post<{ orderId: number }>( // angular expects the backend response to match this format
      this.apiUrl,
      payload, // json body sent to backend
      {
        headers: { // adds authorization header (backend middleware reads the token)
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    );
  }

  getOrderById(orderId: number) {
    return this.http.get<{
      // backend returns order object with order items inside
      order: Order;
      items: OrderItem[];
    }>(
      `${this.apiUrl}/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    );
  }
}
