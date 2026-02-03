import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import {RestaurantDetailComponent} from './components/restaurant-detail /restaurant-detail';
import {ProfileComponent} from './components/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'restaurants/:id',
    component: RestaurantDetailComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];
