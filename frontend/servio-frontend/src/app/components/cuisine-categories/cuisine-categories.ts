import { Component, EventEmitter, Output } from '@angular/core';
import { CUISINES, Cuisine } from '../../data/cuisines';

@Component({
  selector: 'app-cuisine-categories',
  standalone: true,
  templateUrl: './cuisine-categories.html',
  styleUrl: './cuisine-categories.css'
})
export class CuisineCategoriesComponent {
  cuisines: Cuisine[] = CUISINES;

  @Output() cuisineSelected = new EventEmitter<string>();

  // called when the cuisine banner is clicked
  selectCuisine(cuisineKey: string) {
    this.cuisineSelected.emit(cuisineKey);
  }
}
