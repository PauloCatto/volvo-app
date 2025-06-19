import { Component, inject, OnInit } from '@angular/core';
import { VehicleDataService } from '../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';
import { Car, Truck, Bus } from '../../core/services/models/vehicle.model';
import { Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  private vehicleService = inject(VehicleDataService);
  private router = inject(Router);
  private themeService = inject(ThemeService);

  isDarkMode!: boolean;
  favorites$ = this.vehicleService.favoriteItems$;

  ngOnInit(): void {
    this.listenToThemeChanges();
  }

  toggleFavorite(item: Car | Truck | Bus): void {
    item.favorite = !item.favorite;
    this.vehicleService.updateFavorites(item);
    this.checkSingleFavoriteAndNavigate(item);
  }

  getItemDescription(item: Car | Truck | Bus): string {
    if ('bodyType' in item) return `Type: ${item.bodyType} | ${item.modelType}`;
    if ('payload' in item)
      return `Payload: ${item.payload} | ${item.engineType}`;
    if ('capacity' in item)
      return `Capacity: ${item.capacity} | ${item.engineType}`;
    return '';
  }

  checkSingleFavoriteAndNavigate(item: Car | Truck | Bus): void {
    this.vehicleService.favoriteItems$.subscribe((favorites) => {
      if (favorites.length === 0 && item.favorite === false) {
        this.router.navigate(['/home']);
      }
    });
  }

  listenToThemeChanges(): void {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }
}
