import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckDetailComponent } from './truck-detail.component';

describe('TruckDetailComponent', () => {
  let component: TruckDetailComponent;
  let fixture: ComponentFixture<TruckDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TruckDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
