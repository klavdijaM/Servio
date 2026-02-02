import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; // gives access to the current route instance (what url we are currently on, what params does it have)

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.css'
})

export class RestaurantDetailComponent implements OnInit {

  restaurantId!: number;

  constructor(private route: ActivatedRoute) {}

  // runs once after component creation
  ngOnInit() {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id')); // returns id number (in string format) from the url
    console.log('Restaurant ID from route:', this.restaurantId);
  }
}
