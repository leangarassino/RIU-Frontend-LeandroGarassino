import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Select } from './select';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: `<app-select [control]="testControl"></app-select>`,
  imports: [Select, ReactiveFormsModule],
})
class TestHostComponent {
  testControl = new FormControl('value');
}

describe('Select', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: Select;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select, ReactiveFormsModule, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(
      By.directive(Select),
    ).componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
