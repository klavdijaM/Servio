import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService, Restaurant } from '../../services/restaurant.service';
import { RESTAURANTS } from '../../data/restaurants';
import {AuthService} from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-restaurant-detail',
  standalone: true, // doesn't belong to a module, declares its own dependencies
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-detail.html',
  styleUrl: './restaurant-detail.css'
})

export class RestaurantDetailComponent implements OnInit {

  restaurantId!: number;
  restaurant: Restaurant | null = null;
  categories: { id: number; name: string }[] = [];
  dishes: { id: number; name: string; description: string; price: number }[] = [];
  activeCategoryId: number | null = null; // currently selected category

  reviews: {
    id: number;
    rating: number;
    comment: string | null;
    created_at: string;
    username: string;
  }[] = [];

  newRating = 5;
  newComment = '';
  reviewError = '';
  reviewSuccess = '';

  // dependency injection
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService
  ) {}

  // runs once when the component is created (when the route matches)
  ngOnInit() {

    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRestaurant();
    this.loadCategories();
    this.loadReviews();
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

  loadReviews() {
    this.restaurantService
      .getReviewsByRestaurant(this.restaurantId)
      .subscribe({
        next: (data) => {
          this.reviews = data;
          this.cdr.detectChanges();
        },
        error: () => {
          console.error('Failed to load reviews');
        }
      });
  }

  submitReview() {
    this.reviewError = '';
    this.reviewSuccess = '';

    this.restaurantService
      .createReview(
        this.restaurantId,
        this.newRating,
        this.newComment
      )
      .subscribe({
        next: () => {
          this.reviewSuccess = 'Review submitted successfully';
          this.newRating = 5;
          this.newComment = '';
          this.loadReviews(); // refresh list
          this.loadRestaurant(); // refreshes restaurant metadata
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.reviewError =
            err.error?.error || 'Failed to submit review';
        }
      });
  }






}



