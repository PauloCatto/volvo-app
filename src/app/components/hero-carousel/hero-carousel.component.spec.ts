import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HeroCarouselComponent } from './hero-carousel.component';
import { Launches } from '../../core/services/models/vehicle.model';
import { VehicleDataService } from '../../core/services/vehicle-data.service';

describe('HeroCarouselComponent', () => {
  let component: HeroCarouselComponent;
  let fixture: ComponentFixture<HeroCarouselComponent>;

  const mockLaunches: Launches[] = [
    { id: '1', modelName: '', imageUrl: '' },
    { id: '2', modelName: '', imageUrl: '' },
    { id: '3', modelName: '', imageUrl: '' },
  ];

  const vehicleDataServiceMock = {
    getLaunches: jasmine.createSpy('getLaunches'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCarouselComponent, HttpClientTestingModule],
      providers: [
        { provide: VehicleDataService, useValue: vehicleDataServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    vehicleDataServiceMock.getLaunches.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load launches and start auto slide', fakeAsync(() => {
    vehicleDataServiceMock.getLaunches.and.returnValue(of(mockLaunches));
    fixture.detectChanges();

    expect(component.launches.length).toBe(3);
    expect(component.currentIndex).toBe(0);

    tick(8000);
    expect(component.currentIndex).toBe(1);

    tick(8000);
    expect(component.currentIndex).toBe(2);

    tick(8000);
    expect(component.currentIndex).toBe(0);
  }));

  it('should handle error loading launches', () => {
    vehicleDataServiceMock.getLaunches.and.returnValue(
      throwError(() => new Error('fail'))
    );
    spyOn(console, 'error');
    fixture.detectChanges();

    expect(component.launches).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('should go to next launch', () => {
    component.launches = mockLaunches;
    component.currentIndex = 0;

    component.next();
    expect(component.currentIndex).toBe(1);

    component.next();
    expect(component.currentIndex).toBe(2);

    component.next();
    expect(component.currentIndex).toBe(0);
  });

  it('should go to previous launch', () => {
    component.launches = mockLaunches;
    component.currentIndex = 0;

    component.prev();
    expect(component.currentIndex).toBe(2);

    component.prev();
    expect(component.currentIndex).toBe(1);
  });

  it('should clear interval on destroy', () => {
    vehicleDataServiceMock.getLaunches.and.returnValue(of(mockLaunches));
    fixture.detectChanges();

    spyOn(window, 'clearInterval');
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalled();
  });
});
