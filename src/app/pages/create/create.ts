import { Component, inject } from '@angular/core';
import { FormHero } from '../../components/form-hero/form-hero';
import { IHero } from '../../models/Hero.model';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [FormHero],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class Create {
  heroesService = inject(HeroesService);
  router = inject(Router);
  addHero(event: IHero) {
    this.heroesService.addHero(event);
    this.router.navigate(['heroes']);
  }
}
