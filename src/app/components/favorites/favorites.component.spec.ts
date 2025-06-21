import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { VehicleDataService } from '../../core/services/vehicle-data.service';
import { ThemeService } from '../../core/services/theme.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Car, Truck, Bus } from '../../core/services/models/vehicle.model';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  let vehicleServiceMock: any;
  let themeServiceMock: any;
  let routerMock: any;

  const mockFavorites$ = new BehaviorSubject<(Car | Truck | Bus)[]>([]);

  beforeEach(async () => {
    vehicleServiceMock = {
      favoriteItems$: mockFavorites$.asObservable(),
      updateFavorites: jasmine.createSpy('updateFavorites'),
    };

    themeServiceMock = {
      isDarkMode$: new BehaviorSubject<boolean>(false),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        { provide: VehicleDataService, useValue: vehicleServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to theme changes', () => {
    component.listenToThemeChanges();

    themeServiceMock.isDarkMode$.next(true);
    expect(component.isDarkMode).toBeTrue();

    themeServiceMock.isDarkMode$.next(false);
    expect(component.isDarkMode).toBeFalse();
  });

  it('should return correct description for Car', () => {
    const car: Car = {
      id: 1,
      bodyType: 'SUV',
      modelType: 'Electric',
      favorite: true,
      modelName: 'XC40',
    } as unknown as Car;
    const desc = component.getItemDescription(car);
    expect(desc).toBe('Type: SUV | Electric');
  });

  it('should return correct description for Truck', () => {
    const truck: Truck = {
      id: 1,
      payload: '10 tons',
      engineType: 'Diesel',
      favorite: true,
      modelName: 'FMX',
    } as unknown as Truck;
    const desc = component.getItemDescription(truck);
    expect(desc).toBe('Payload: 10 tons | Diesel');
  });

  it('should return correct description for Bus', () => {
    const bus: Bus = {
      id: 1,
      capacity: '50 seats',
      engineType: 'Hybrid',
      favorite: true,
      modelName: '7900',
    } as unknown as Bus;
    const desc = component.getItemDescription(bus);
    expect(desc).toBe('Capacity: 50 seats | Hybrid');
  });

  it('should toggle favorite and update service', () => {
    const car: Car = {
      id: 1,
      modelName: 'XC40',
      favorite: false,
    } as unknown as Car;

    component.toggleFavorite(car);
    expect(car.favorite).toBeTrue();
    expect(vehicleServiceMock.updateFavorites).toHaveBeenCalledWith(car);
  });

  it('should navigate to /home when removing last favorite', () => {
    const car: Car = {
      id: 1,
      modelName: 'XC40',
      favorite: true,
    } as unknown as Car;

    mockFavorites$.next([car]);

    component.toggleFavorite(car);

    mockFavorites$.next([]);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });
});
