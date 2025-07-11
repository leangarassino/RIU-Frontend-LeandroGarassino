import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UppercaseInputDirective } from './uppercase-input-directive';

@Component({
  standalone: true,
  imports: [UppercaseInputDirective],
  template: `<input [value]="'test'" appUppercaseInputDirective />`,
})
class TestComponent {}

describe('UppercaseInputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UppercaseInputDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.directive(UppercaseInputDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(inputEl).toBeTruthy();
    const directiveInstance = inputEl.injector.get(UppercaseInputDirective);
    expect(directiveInstance).toBeTruthy();
  });

  it('should convert input to uppercase on keyup', () => {
    const inputNativeEl: HTMLInputElement = inputEl.nativeElement;
    inputNativeEl.value = 'test';
    inputNativeEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputNativeEl.value).toBe('TEST');
  });
});
