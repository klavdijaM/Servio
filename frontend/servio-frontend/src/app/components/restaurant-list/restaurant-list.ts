import { Component, Input } from '@angular/core';
import { Restaurant } from '../../services/restaurant.service';
import { Router } from '@angular/router';
import { RESTAURANTS } from '../../data/restaurants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurants-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-list.html',
  styleUrl: './restaurant-list.css'
})

export class RestaurantsListComponent {
  // allows the variable to be set from outside - the component does not own restaurant data, it has to receive it
  @Input() restaurants: Restaurant[] = [];

  constructor(private router: Router) {}

  getRestaurantImage(name: string): string {
    const match = RESTAURANTS.find(r => r.name === name);
    return match ? match.image : 'assets/restaurants/placeholder.webp';
  }

  openRestaurant(id: number) {
    this.router.navigate(['/restaurants', id]); // changes url to /restaurants/id to get a single restaurant page
  }

}
