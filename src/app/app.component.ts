import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './core/services/theme.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  isDarkMode!: boolean;

  ngOnInit(): void {
    this.listenToThemeChanges();
    this.handleRouteChanges();
  }

  listenToThemeChanges(): void {
    this.themeService.isDarkMode$.subscribe((mode) => {
      this.isDarkMode = mode;
    });
  }

  handleRouteChanges(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
