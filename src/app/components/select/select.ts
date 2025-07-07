import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select {
  @Input() options: { value: string; label: string }[] = [];
  @Input() label: string = 'label';
  @Input() control!: FormControl;
  @Output() changeValue: EventEmitter<string> = new EventEmitter();
}
