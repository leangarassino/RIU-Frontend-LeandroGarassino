import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appSelectFocus]',
})
export class SelectFocusDirective {
  element = inject(ElementRef);

  @HostListener('focus')
  onFocus(): void {
    const inputElement = this.element.nativeElement as HTMLInputElement;
    inputElement.select();
  }
}
