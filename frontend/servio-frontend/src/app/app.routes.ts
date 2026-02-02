import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import {RestaurantDetailComponent} from './components/restaurant-detail /restaurant-detail';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'restaurants/:id',
    component: RestaurantDetailComponent
  }
];
