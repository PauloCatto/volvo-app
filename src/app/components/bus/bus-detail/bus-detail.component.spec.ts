import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BusDetailComponent } from './bus-detail.component';
import { of, throwError, Subject } from 'rxjs';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { ThemeService } from '../../../core/services/theme.service';
import { MatDialog } from '@angular/material/dialog';
import { Bus } from '../../../core/services/models/vehicle.model';

describe('BusDetailComponent', () => {
  let component: BusDetailComponent;
  let fixture: ComponentFixture<BusDetailComponent>;

  let vehicleServiceMock: any;
  let themeServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    vehicleServiceMock = {
      getBuses: jasmine.createSpy('getBuses'),
      updateFavorites: jasmine.createSpy('updateFavorites'),
    };

    themeServiceMock = {
      isDarkMode$: new Subject<boolean>(),
    };

    dialogMock = {
      open: jasmine.createSpy('open'),
    };

    await TestBed.configureTestingModule({
      imports: [BusDetailComponent],
      providers: [
        { provide: VehicleDataService, useValue: vehicleServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get buses on ngOnInit (success)', fakeAsync(() => {
    const busesMock: Bus[] = [
      {
        id: 1,
        modelName: 'Model X',
        favorite: false,
        details: 'Details X',
      } as unknown as Bus,
    ];
    vehicleServiceMock.getBuses.and.returnValue(of(busesMock));

    component.ngOnInit();
    tick();

    expect(vehicleServiceMock.getBuses).toHaveBeenCalled();
    expect(component.buses).toEqual(busesMock);
  }));

  it('should handle error on getBuses', fakeAsync(() => {
    const consoleErrorSpy = spyOn(console, 'error');
    vehicleServiceMock.getBuses.and.returnValue(
      throwError(() => new Error('Failed'))
    );

    component.getBuses();
    tick();

    expect(component.buses).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalled();
  }));

  it('should listen to theme changes', () => {
    component.listenToThemeChanges();
    themeServiceMock.isDarkMode$.next(true);
    expect(component.isDarkMode).toBeTrue();

    themeServiceMock.isDarkMode$.next(false);
    expect(component.isDarkMode).toBeFalse();
  });

  it('should toggle favorite and updateFavorites called', () => {
    const bus: Bus = {
      id: 1,
      modelName: 'X',
      favorite: false,
      details: 'D',
    } as unknown as Bus;

    component.toggleFavorite(bus);

    expect(bus.favorite).toBeTrue();
    expect(vehicleServiceMock.updateFavorites).toHaveBeenCalledWith(bus);

    component.toggleFavorite(bus);

    expect(bus.favorite).toBeFalse();
  });

  it('should open dialog with bus data', () => {
    const bus: Bus = {
      id: 1,
      modelName: 'X',
      favorite: false,
      details: 'Details here',
    } as unknown as Bus;

    component.openDetailsDialog(bus);

    expect(dialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      data: {
        title: bus.modelName,
        message: bus.details,
      },
    });
  });
});
