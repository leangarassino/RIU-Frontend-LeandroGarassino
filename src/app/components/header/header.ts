import { Component } from '@angular/core';
import { Link } from '../link/link';

@Component({
  selector: 'app-header',
  imports: [Link],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
