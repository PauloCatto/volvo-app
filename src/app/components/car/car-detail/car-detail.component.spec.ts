import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CarDetailComponent } from './car-detail.component';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { ThemeService } from '../../../core/services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError, Subject } from 'rxjs';
import { Car } from '../../../core/services/models/vehicle.model';

describe('CarDetailComponent', () => {
  let component: CarDetailComponent;
  let fixture: ComponentFixture<CarDetailComponent>;

  let vehicleServiceMock: any;
  let themeServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    vehicleServiceMock = {
      getCars: jasmine.createSpy('getCars'),
      updateFavorites: jasmine.createSpy('updateFavorites'),
    };

    themeServiceMock = {
      isDarkMode$: new Subject<boolean>(),
    };

    dialogMock = {
      open: jasmine.createSpy('open'),
    };

    await TestBed.configureTestingModule({
      imports: [CarDetailComponent],
      providers: [
        { provide: VehicleDataService, useValue: vehicleServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cars on ngOnInit (success)', fakeAsync(() => {
    const carsMock: Car[] = [
      {
        id: 1,
        modelName: 'Model S',
        favorite: false,
        details: 'Electric Car',
      } as unknown as Car,
    ];
    vehicleServiceMock.getCars.and.returnValue(of(carsMock));

    component.ngOnInit();
    tick();

    expect(vehicleServiceMock.getCars).toHaveBeenCalled();
    expect(component.cars).toEqual(carsMock);
  }));

  it('should handle error on getCars', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'log');
    vehicleServiceMock.getCars.and.returnValue(
      throwError(() => new Error('Failed'))
    );

    component.getCars();
    tick();

    expect(component.cars).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error));
  }));

  it('should listen to theme changes', () => {
    component.listenToThemeChanges();

    themeServiceMock.isDarkMode$.next(true);
    expect(component.isDarkMode).toBeTrue();

    themeServiceMock.isDarkMode$.next(false);
    expect(component.isDarkMode).toBeFalse();
  });

  it('should toggle favorite and call updateFavorites', () => {
    const car: Car = {
      id: 1,
      modelName: 'X',
      favorite: false,
      details: 'D',
    } as unknown as Car;

    component.toggleFavorite(car);
    expect(car.favorite).toBeTrue();
    expect(vehicleServiceMock.updateFavorites).toHaveBeenCalledWith(car);

    component.toggleFavorite(car);
    expect(car.favorite).toBeFalse();
  });

  it('should open dialog with car details', () => {
    const car: Car = {
      id: 1,
      modelName: 'X',
      favorite: false,
      details: 'Details here',
    } as unknown as Car;

    component.openDetailsDialog(car);

    expect(dialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      data: {
        title: car.modelName,
        message: car.details,
      },
    });
  });
});
