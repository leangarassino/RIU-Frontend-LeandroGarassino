import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertDialog } from './alert-dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AlertDialog', () => {
  let component: AlertDialog;
  let fixture: ComponentFixture<AlertDialog>;

  const mockMatDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const mockMatDialogData = {
    title: 'Test Title',
    message: 'Test Message',
    acceptLabel: 'Confirmar',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialog],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockMatDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
