import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Link } from '../../components/link/link';

@Component({
  selector: 'app-welcome',
  imports: [RouterModule, Link],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {}
