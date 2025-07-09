import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorHelperService {
  formControlHasError(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.dirty || control.touched);
  }
  getErrorMessage(control: AbstractControl | null): string {
    if (!control || !control.errors) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Este campo es requerido.';
    }
    if (control.hasError('min')) {
      return `El valor mínimo es ${control.errors['min'].min}.`;
    }
    if (control.hasError('max')) {
      return `El valor máximo es ${control.errors['max'].max}.`;
    }
    if (control.hasError('minlength')) {
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres.`;
    }
    if (control.hasError('maxlength')) {
      return `Máximo ${control.errors['maxlength'].requiredLength} caracteres.`;
    }
    if (control.hasError('email')) {
      return 'Formato de email inválido.';
    }
    if (control.hasError('pattern')) {
      return 'Formato inválido.';
    }

    return 'Error de validación.';
  }
}
