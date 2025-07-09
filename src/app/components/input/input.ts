import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectFocusDirective } from '../../directives/select-focus';
import { UppercaseInputDirective } from '../../directives/uppercase-input-directive';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SelectFocusDirective,
    UppercaseInputDirective,
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  standalone: true,
})
export class InputComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() type: string = 'text';
  @Input() toUppercase: boolean = false;
}
