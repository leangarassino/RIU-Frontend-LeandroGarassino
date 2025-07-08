import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() typeButton: 'primary' | 'secondary' | 'basic' | 'cancel' = 'primary';
  @Input() maxWidth: boolean = true;
  @Input() text: string = 'Confirmar';
  @Input() disabled: boolean = false;
  @Output() confirm = new EventEmitter();
}
