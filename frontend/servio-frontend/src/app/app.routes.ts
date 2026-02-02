import { Routes } from '@angular/router';

export const routes: Routes = [
  // when url matches, Angular destroys previous view and creates the component
  {
    path: 'restaurants/:id',
    component: RestaurantPageComponent
  }
];
