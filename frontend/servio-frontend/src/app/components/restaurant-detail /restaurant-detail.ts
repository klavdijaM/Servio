import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';
import { RESTAURANTS } from '../../data/restaurants';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true, // doesn't belong to a module, declares its own dependencies
  imports: [CommonModule],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.css'
})

export class RestaurantDetailComponent implements OnInit {

  restaurantId!: number;
  restaurant: Restaurant | null = null;
  categories: { id: number; name: string }[] = [];
  dishes: { id: number; name: string; description: string; price: number }[] = [];
  activeCategoryId: number | null = null; // currently selected category

  // dependency injection
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cdr: ChangeDetectorRef
  ) {}

  // runs once when the component is created (when the route matches)
  ngOnInit() {

    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRestaurant();
    this.loadCategories();
  }

  private loadRestaurant() {
    // calls backend endpoint (GET http://localhost:3000/restaurants/7)
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
      next: (data) => {
        this.restaurant = data; // json sent from backend becomes the js object
        this.cdr.detectChanges();
        console.log('Loaded restaurant:', data);
      },
      error: (err) => {
        console.error('Failed to load restaurant', err);
      }
    });
  }

  private loadCategories() {
    this.restaurantService.getCategoriesByRestaurant(this.restaurantId).subscribe({
      next: (data) => { // backend sends json, angular converts it into js obj
        this.categories = data;

        // first category selected by default
        if (this.categories.length > 0) {
          const firstCategoryId = this.categories[0].id;
          this.loadDishes(firstCategoryId);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }

  // called when user clicks on a category
  loadDishes(categoryId: number) {
    this.activeCategoryId = categoryId;

    // clear old dishes from DOM
    this.dishes = [];
    this.cdr.detectChanges();

    this.restaurantService
      .getDishesByCategory(this.restaurantId, categoryId)
      .subscribe({
        next: (data) => {
          this.dishes = data;
          this.cdr.detectChanges(); // detect and render new dishes
        },
        error: (err) => {
          console.error('Failed to load dishes', err);
        }
      });
  }

  getRestaurantImage(name: string): string {
    const match = RESTAURANTS.find(r => r.name === name);
    return match ? match.image : 'assets/restaurants/placeholder.webp';
  }


}



