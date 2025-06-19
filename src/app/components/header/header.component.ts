import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { VehicleDataService } from '../../core/services/vehicle-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private vehicleService = inject(VehicleDataService);

  hasFavorites!: boolean;
  isFavorited!: boolean;
  isDarkMode!: boolean;

  ngOnInit(): void {
    this.listenToThemeChanges();
    this.listenToFavoritesChanges();
  }

  listenToThemeChanges(): void {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  listenToFavoritesChanges(): void {
    this.vehicleService.favoriteItems$.subscribe((items) => {
      this.hasFavorites = items.length > 0;
    });
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  toggleFavorites(): void {
    this.isFavorited = !this.isFavorited;
  }
}
