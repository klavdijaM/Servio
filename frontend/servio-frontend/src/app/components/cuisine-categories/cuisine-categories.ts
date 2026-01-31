import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CUISINES, Cuisine } from '../../data/cuisines';

@Component({
  selector: 'app-cuisine-categories',
  standalone: true,
  templateUrl: './cuisine-categories.html',
  styleUrl: './cuisine-categories.css'
})
export class CuisineCategoriesComponent implements AfterViewInit {
  cuisines: Cuisine[] = CUISINES;

  // output -> sends message from child to parent
  @Output() cuisineSelected = new EventEmitter<string>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  canScrollLeft = false;
  canScrollRight = false;

  // called when the cuisine banner is clicked
  selectCuisine(cuisineKey: string) {
    this.cuisineSelected.emit(cuisineKey); // sends the value out of the component ('japanese')
  }

  // gets activated on first page loading
  ngAfterViewInit() {
    this.updateScrollArrows();
  }

  // gets activated when user scrolls
  onScroll() {
    this.updateScrollArrows();
  }

  updateScrollArrows() {
    const el = this.scrollContainer.nativeElement;

    this.canScrollLeft = el.scrollLeft > 0; // how far the content is scrolled from the left edge
    this.canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth;
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

}
