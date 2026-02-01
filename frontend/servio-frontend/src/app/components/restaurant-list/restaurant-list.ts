import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class RestaurantsListComponent implements OnChanges {

  @Input() restaurants: Restaurant[] = [];

  constructor(private router: Router) {}

  // debugging: checking communication between app and restaurant-list component
  ngOnChanges(changes: SimpleChanges) {
    if (changes['restaurants']) {
      console.log(
        'RestaurantsListComponent received restaurants:',
        this.restaurants
      );
    }
  }

  getRestaurantImage(name: string): string {
    const match = RESTAURANTS.find(r => r.name === name);
    return match ? match.image : 'assets/restaurants/placeholder.webp';
  }

  openRestaurant(id: number) {
    this.router.navigate(['/restaurants', id]);
  }
}
