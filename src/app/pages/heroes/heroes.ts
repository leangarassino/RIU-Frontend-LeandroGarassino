import { Component, computed, inject } from '@angular/core';
import { Table, TableCell } from '../../components/table/table';
import { Link } from '../../components/link/link';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { IHero } from '../../models/Hero.model';
@Component({
  selector: 'app-heroes',
  imports: [Table, Link],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
})
export class Heroes {
  router = inject(Router);
  heroesService = inject(HeroesService);
  dataHeroes = this.heroesService.heroes;
  colums = computed<string[]>(() => {
    if (this.dataHeroes().length > 0) {
      return ['name', 'category', 'gender', 'isRetired', 'actions'];
    } else {
      return [];
    }
  });
  heroesForTable = computed<Record<string, TableCell>[]>(() => {
    return this.dataHeroes().map((hero: IHero) => ({
      id: hero.id,
      name: hero.name,
      history: hero.history,
      category: hero.category,
      gender: hero.gender,
      isRetired: hero.isRetired,
    }));
  });

  navigateEdit(event: Record<string, TableCell>) {
    this.router.navigate(['heroes/edit', event['id']]);
  }

  navigateHero(event: Record<string, TableCell>) {
    this.router.navigate(['heroes/hero', event['id']]);
  }

  onDelete(event: Record<string, TableCell>) {
    const id = event['id'] as string;
    this.heroesService.deleteHero(id);
  }
}
