import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFocusDirective } from './select-focus';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [SelectFocusDirective],
  template: `<input type="text" appSelectFocus />`,
})
class TestComponent {}

describe('SelectFocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFocusDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.directive(SelectFocusDirective));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(inputEl).toBeTruthy();
    const directiveInstance = inputEl.injector.get(SelectFocusDirective);
    expect(directiveInstance).toBeTruthy();
  });
});
