import { TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { ErrorHelperService } from './error-helper.service';

describe('ErrorHelperService', () => {
  let service: ErrorHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHelperService],
    });
    service = TestBed.inject(ErrorHelperService);
  });

  describe('formControlHasError', () => {
    it('should return false if control is null', () => {
      expect(service.formControlHasError(null)).toBeFalse();
    });

    it('should return false if control is valid', () => {
      const control = new FormControl('validValue');
      expect(service.formControlHasError(control)).toBeFalse();
    });

    it('should return false if control is invalid but not dirty or touched', () => {
      const control = new FormControl('', Validators.required);
      expect(control.invalid).toBeTrue();
      expect(control.dirty).toBeFalse();
      expect(control.touched).toBeFalse();
      expect(service.formControlHasError(control)).toBeFalse();
    });

    it('should return true if control is invalid and dirty', () => {
      const control = new FormControl('', Validators.required);
      control.markAsDirty();
      expect(control.invalid).toBeTrue();
      expect(control.dirty).toBeTrue();
      expect(service.formControlHasError(control)).toBeTrue();
    });

    it('should return true if control is invalid and touched', () => {
      const control = new FormControl('', Validators.required);
      control.markAsTouched();
      expect(control.invalid).toBeTrue();
      expect(control.touched).toBeTrue();
      expect(service.formControlHasError(control)).toBeTrue();
    });

    it('should return true if control is invalid, dirty, and touched', () => {
      const control = new FormControl('', Validators.required);
      control.markAsDirty();
      control.markAsTouched();
      expect(control.invalid).toBeTrue();
      expect(control.dirty).toBeTrue();
      expect(control.touched).toBeTrue();
      expect(service.formControlHasError(control)).toBeTrue();
    });
  });

  describe('getErrorMessage', () => {
    it('should return an empty string if control is null', () => {
      expect(service.getErrorMessage(null)).toBe('');
    });

    it('should return an empty string if control has no errors', () => {
      const control = new FormControl('someValue', Validators.required);
      control.setValue('valid');
      expect(service.getErrorMessage(control)).toBe('');
    });

    it('should return an empty string if control has errors but is not explicitly validated by the service', () => {
      const control = new FormControl('invalid', () => ({ customError: true }));
      expect(service.getErrorMessage(control)).toBe('Error de validación.');
    });

    it('should return "Este campo es requerido." for required error', () => {
      const control = new FormControl('', Validators.required);
      expect(control.hasError('required')).toBeTrue();
      expect(service.getErrorMessage(control)).toBe('Este campo es requerido.');
    });

    it('should return correct message for min error', () => {
      const control = new FormControl(0, Validators.min(10));
      expect(control.hasError('min')).toBeTrue();
      expect(service.getErrorMessage(control)).toBe('El valor mínimo es 10.');
    });

    it('should return correct message for max error', () => {
      const control = new FormControl(100, Validators.max(50));
      expect(control.hasError('max')).toBeTrue();
      expect(service.getErrorMessage(control)).toBe('El valor máximo es 50.');
    });

    it('should return correct message for minlength error', () => {
      const control = new FormControl('abc', Validators.minLength(5));
      expect(control.hasError('minlength')).toBeTrue();
      expect(service.getErrorMessage(control)).toBe('Mínimo 5 caracteres.');
    });

    it('should return correct message for maxlength error', () => {
      const control = new FormControl('abcdefgh', Validators.maxLength(5));
      expect(control.hasError('maxlength')).toBeTrue();
      expect(service.getErrorMessage(control)).toBe('Máximo 5 caracteres.');
    });

    it('should return "Error de validación." for unhandled errors', () => {
      const control = new FormControl('test', Validators.email);
      control.markAsTouched();
      control.setErrors({ email: true });
      expect(service.getErrorMessage(control)).toBe('Error de validación.');
    });

    it('should return "Este campo es requerido." if only required error exists', () => {
      const control = new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]);
      expect(control.hasError('required')).toBeTrue();
      expect(control.hasError('minlength')).toBeFalse();
      expect(service.getErrorMessage(control)).toBe('Este campo es requerido.');
    });

    it('should return correct message for minlength error when it is the primary error', () => {
      const control = new FormControl('abc', [
        Validators.required,
        Validators.minLength(5),
      ]);
      expect(control.hasError('required')).toBeFalse();
      expect(control.hasError('minlength')).toBeTrue();
      expect(service.getErrorMessage(control)).toBe('Mínimo 5 caracteres.');
    });

    it('should prioritize the first error as per the if-else if chain in the service', () => {
      const control = new FormControl('123456', [
        Validators.min(100),
        Validators.maxLength(5),
      ]);
      control.setErrors({
        min: { min: 100, actual: 123456 },
        maxlength: { requiredLength: 5, actualLength: 6 },
      });

      expect(service.getErrorMessage(control)).toBe('El valor mínimo es 100.');
    });
  });
});
