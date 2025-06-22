import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../core/services/theme.service';
import { VehicleDataService } from '../../core/services/vehicle-data.service';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let themeServiceMock: any;
  let vehicleServiceMock: any;

  beforeEach(async () => {
    themeServiceMock = {
      isDarkMode$: new BehaviorSubject<boolean>(false),
      toggleDarkMode: jasmine.createSpy('toggleDarkMode'),
    };

    vehicleServiceMock = {
      favoriteItems$: new BehaviorSubject<any[]>([]),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: VehicleDataService, useValue: vehicleServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    component.toggleDarkMode();
    expect(themeServiceMock.toggleDarkMode).toHaveBeenCalled();
  });

  it('should toggle favorites state', () => {
    expect(component.isFavorited).toBeFalse();
    component.toggleFavorites();
    expect(component.isFavorited).toBeTrue();
  });

  it('should toggle menu open and close', () => {
    expect(component.isMenuOpen).toBeFalse();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();

    component.closeMenu();
    expect(component.isMenuOpen).toBeFalse();
  });

  it('should listen and react to theme changes', () => {
    component.listenToThemeChanges();

    themeServiceMock.isDarkMode$.next(true);
    expect(component.isDarkMode).toBeTrue();

    themeServiceMock.isDarkMode$.next(false);
    expect(component.isDarkMode).toBeFalse();
  });

  it('should listen and react to favorites changes', () => {
    component.listenToFavoritesChanges();

    vehicleServiceMock.favoriteItems$.next(['item1']);
    expect(component.hasFavorites).toBeTrue();

    vehicleServiceMock.favoriteItems$.next([]);
    expect(component.hasFavorites).toBeFalse();
  });
});
