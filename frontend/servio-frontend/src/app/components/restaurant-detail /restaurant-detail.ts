import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.css'
})

export class RestaurantDetailComponent implements OnInit {

  restaurantId!: number;
  restaurant!: Restaurant; // starts as undefined

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  // runs once when the component is created (route matches)
  ngOnInit() {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));

    // calls backend endpoint (GET http://localhost:3000/restaurants/7)
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
      next: (data) => {
        this.restaurant = data; // json sent from backend becomes the js object
        console.log('Loaded restaurant:', data);
      },
      error: (err) => {
        console.error('Failed to load restaurant', err);
      }
    });
  }
}
