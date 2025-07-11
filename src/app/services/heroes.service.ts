import { inject, Injectable, Signal } from '@angular/core';
import { HeroesState } from '../state/heroes.state';
import { IHero } from '../models/Hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroesState = inject(HeroesState);

  get heroes(): Signal<IHero[]> {
    return this.heroesState.heroes;
  }

  addHero(newHero: IHero): void {
    this.heroesState.addHero(newHero);
  }

  deleteHero(id: string): IHero[] {
    const heroes = this.heroesState.deleteHero(id);
    return heroes;
  }

  editHero(hero: IHero): void {
    this.heroesState.editHero(hero);
  }

  getHero(id: string): IHero | undefined {
    return this.heroes().find((hero) => hero.id === id);
  }

  searchHeroesByName(name: string | null): IHero[] {
    const searchTerm = name?.trim().toLowerCase();

    if (!searchTerm) {
      return this.heroes();
    }

    return this.heroes().filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm),
    );
  }
}
