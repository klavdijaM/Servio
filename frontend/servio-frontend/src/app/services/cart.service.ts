import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // makes it possible for changes in one place to be reflected on other components

export interface CartItem {
  dishId: number;
  name: string;
  price: number;
  quantity: number;
  restaurantId: number;
}

@Injectable({
  providedIn: 'root' // one cart for the whole app => survives route changes
})

// service => shared logic container
export class CartService {

  // Key used to store cart in localStorage
  private readonly CART_KEY = 'cart_items';

  // creates a storage for cart items that stores the current cart and can tell other components when it changes  => starts as an empty array
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable that components can subscribe to => they can listen to it but not mutate
  items$ = this.itemsSubject.asObservable(); // read-only view of the cart

  constructor() {
    const stored = localStorage.getItem(this.CART_KEY); // looks inside localstorage to find the value stored under the "cart_items" key

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[]; // turns the text into real cartItems
        this.itemsSubject.next(parsed); // replace the current cart (empty array) with this cart and notify everyone
      } catch { // if json parsing fails
        localStorage.removeItem(this.CART_KEY);
      }
    }
  }

  // getter
  get items(): CartItem[] {
    return this.itemsSubject.value; // returns the current cart
  }

  addItem(item: CartItem) {
    const currentRestaurantId = this.getRestaurantId();

    if (
      currentRestaurantId !== null &&
      currentRestaurantId !== item.restaurantId
    ) {
      throw new Error(
        'You can only order from one restaurant at a time'
      );
    }

    const existing = this.items.find(i => i.dishId === item.dishId);

    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }

    this.updateState();
  }


  // removes one quantity of the dish in the cart
  removeItem(dishId: number) {
    const existing = this.items.find(i => i.dishId === dishId);
    if (!existing) return;

    existing.quantity--;

    if (existing.quantity <= 0) { // dish should be removed if quantity after removal is less than 0
      const filtered = this.items.filter(i => i.dishId !== dishId); // keeps every item in the array except the item being removed
      this.itemsSubject.next(filtered); // pushes filtered as the new cart state and notifies subscribers
    } else {
      this.itemsSubject.next([...this.items]); // updates the array with the lowered quantity of the dish
    }

    this.persist(); // saves the current cart state to localStorage
  }

  clearCart() {
    this.itemsSubject.next([]); // pushes empty array as the new cart state
    this.persist(); // saves the empty array to LS
  }

  // returns the total price of cart
  getTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  // returns number of items in cart
  getItemCount(): number {
    return this.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  getRestaurantId(): number | null {
    return this.items.length > 0 // if there is at least one item in the cart
      ? this.items[0].restaurantId
      : null;
  }

  // updates in-memory cart state and notifies subscribers
  private updateState() {
    this.itemsSubject.next([...this.items]);
    this.persist();
  }

  // saves the cart state to local disk
  private persist() {
    localStorage.setItem(
      this.CART_KEY,
      JSON.stringify(this.items) // turns objects into text (local storage excepts only text in form of key value pairs, no js objects)
    );
  }
}
