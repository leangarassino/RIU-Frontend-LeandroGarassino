import { Component, inject, Input, OnInit } from '@angular/core';
import { FormHero } from '../../components/form-hero/form-hero';
import { IHero } from '../../models/Hero.model';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  imports: [FormHero],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit implements OnInit {
  @Input() id: string = '';
  heroesService = inject(HeroesService);
  router = inject(Router);
  hero: IHero | null = null;

  ngOnInit(): void {
    if (this.id) {
      this.hero = this.heroesService.getHero(this.id) ?? null;
    }
  }

  editHero(hero: IHero) {
    this.heroesService.editHero(hero);
    this.router.navigate(['heroes/hero', hero.id]);
  }
}
