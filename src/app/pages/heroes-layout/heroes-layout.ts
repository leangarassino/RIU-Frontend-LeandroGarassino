import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-heroes-layout',
  imports: [RouterOutlet],
  templateUrl: './heroes-layout.html',
  styleUrl: './heroes-layout.scss',
})
export class HeroesLayout {}
