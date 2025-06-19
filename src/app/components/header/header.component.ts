import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  isFavorited!: boolean;
  isDarkMode!: boolean;

  ngOnInit(): void {
  this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

   toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  toggleFavorites(): void {
    this.isFavorited = !this.isFavorited;
  }
}
