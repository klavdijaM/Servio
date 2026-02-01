import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RestaurantFilters {
  freeDelivery: boolean;
  maxDeliveryTime: number | null;
  minRating: number | null;
  maxMinOrder: number | null;
}

@Component({
  selector: 'app-restaurant-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-filters.html',
  styleUrl: './restaurant-filters.css'
})
export class RestaurantFiltersComponent {

  // UI state: reflects what the user selected
  filters: RestaurantFilters = {
    freeDelivery: false,
    maxDeliveryTime: null,
    minRating: null,
    maxMinOrder: null
  };

  @Output() filtersChanged = new EventEmitter<RestaurantFilters>();

  // will be called when a checkbox/input changes
  onFiltersChange() {
    this.filtersChanged.emit({ ...this.filters }); // creates a new filters object
  }
}
