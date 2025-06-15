import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../hero-carousel/hero-carousel.component';
import { CategoryCardsComponent } from '../category-cards/category-cards.component';
import { NewsComponent } from '../news/news.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroCarouselComponent,
    CategoryCardsComponent,
    NewsComponent,
    MapComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
