import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TruckDetailComponent } from './truck-detail.component';
import { VehicleDataService } from '../../../core/services/vehicle-data.service';
import { ThemeService } from '../../../core/services/theme.service';
import { MatDialog } from '@angular/material/dialog';

describe('TruckDetailComponent', () => {
  let component: TruckDetailComponent;
  let fixture: ComponentFixture<TruckDetailComponent>;

  const vehicleDataServiceMock = {
    getTrucks: jasmine.createSpy('getTrucks').and.returnValue(of([])),
    updateFavorites: jasmine.createSpy('updateFavorites'),
  };

  const themeServiceMock = {
    isDarkMode$: of(false),
  };

  const matDialogMock = {
    open: jasmine.createSpy('open'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckDetailComponent, HttpClientTestingModule],
      providers: [
        { provide: VehicleDataService, useValue: vehicleDataServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TruckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle favorite', () => {
    const truck = { favorite: false } as any;
    component.toggleFavorite(truck);
    expect(truck.favorite).toBeTrue();
    expect(vehicleDataServiceMock.updateFavorites).toHaveBeenCalledWith(truck);
  });

  it('should open dialog with correct data', () => {
    const truck = { modelName: 'Model X', details: 'Details here' } as any;
    component.openDetailsDialog(truck);
    expect(matDialogMock.open).toHaveBeenCalledWith(jasmine.any(Function), {
      width: '500px',
      data: {
        title: 'Model X',
        message: 'Details here',
      },
    });
  });
});
