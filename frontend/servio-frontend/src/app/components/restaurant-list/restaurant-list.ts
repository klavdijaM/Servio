import { Component, Input } from '@angular/core';
import { Restaurant } from '../../services/restaurant.service';
import { RESTAURANTS } from '../../data/restaurants';

@Component({
  selector: 'app-restaurants-list',
  standalone: true,
  templateUrl: './restaurants-list.html',
  styleUrl: './restaurants-list.css'
})
export class RestaurantsListComponent {
  // allows the variable to be set from outside - the component does not own restaurant data, it has to receive it
  @Input() restaurants: Restaurant[] = [];

  getRestaurantImage(name: string): string {
    const match = RESTAURANTS.find(r => r.name === name);
    return match ? match.image : 'assets/restaurants/placeholder.webp';
  }
}
