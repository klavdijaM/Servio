import { Component, EventEmitter, Output, Input } from '@angular/core';
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

  @Input() autoApply = false; // don't auto-apply by default unless the parent says so

  // UI state: reflects what the user selected
  filters: RestaurantFilters = {
    freeDelivery: false,
    maxDeliveryTime: null,
    minRating: null,
    maxMinOrder: null
  };

  // without events, child can't talk to the parent component (app)
  @Output() filtersChanged = new EventEmitter<RestaurantFilters>();

  // will be called when a checkbox/input changes
  applyFilters() {
    this.filtersChanged.emit({ ...this.filters }); // sends a copy of the new filters object to the parent
  }

  onValueChanged() {
    if (this.autoApply) {
      this.applyFilters();
    }
  }

}
