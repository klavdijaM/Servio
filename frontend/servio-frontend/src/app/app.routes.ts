import { Routes } from '@angular/router';
import {RestaurantDetailComponent} from './components/restaurant-detail /restaurant-detail';

export const routes: Routes = [
  // when url matches, Angular destroys previous view and creates the component
  {
    path: 'restaurants/:id',
    component: RestaurantDetailComponent
  }
];
