import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomDialogComponent } from './custom-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('CustomDialogComponent', () => {
  let component: CustomDialogComponent;
  let fixture: ComponentFixture<CustomDialogComponent>;

  let dialogRefMock: any;
  const dialogDataMock = {
    title: 'Test Title',
    message: 'Test message content',
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    await TestBed.configureTestingModule({
      imports: [CustomDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct data injected', () => {
    expect(component.data.title).toBe('Test Title');
    expect(component.data.message).toBe('Test message content');
  });

  it('should close the dialog when close() is called', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
