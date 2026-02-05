import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import {RestaurantDetailComponent} from './components/restaurant-detail /restaurant-detail';
import {ProfileComponent} from './components/profile/profile';
import { CheckoutComponent } from './components/checkout/checkout';
import {OrderPageComponent} from './components/order-page/order-page';


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
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'orders/:id', component: OrderPageComponent
  }
];
