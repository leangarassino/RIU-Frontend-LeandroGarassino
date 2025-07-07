import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-link',
  imports: [RouterModule, CommonModule],
  templateUrl: './link.html',
  styleUrl: './link.scss',
})
export class Link {
  @Input() text: string | null = null;
  @Input() path: string | null = null;
  @Input() type: 'primary' | 'basic' = 'primary';
}
