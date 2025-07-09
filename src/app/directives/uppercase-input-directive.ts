import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercaseInputDirective]',
  standalone: true,
})
export class UppercaseInputDirective {
  private element = inject(ElementRef);
  private ngControl = inject(NgControl, { optional: true });

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = this.element.nativeElement as HTMLInputElement;
    const value = inputElement.value;
    if (value !== value.toUpperCase()) {
      inputElement.value = value.toUpperCase();
      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(value.toUpperCase(), {
          emitEvent: false,
        });
      }
    }
  }
}
