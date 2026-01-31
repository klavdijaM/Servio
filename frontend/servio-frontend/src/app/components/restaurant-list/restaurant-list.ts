import { Component, Input } from '@angular/core';
import { Restaurant } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  standalone: true,
  templateUrl: './restaurants-list.html',
  styleUrl: './restaurants-list.css'
})
export class RestaurantsListComponent {
  // allows the variable to be set from outside
  @Input() restaurants: Restaurant[] = [];
}
