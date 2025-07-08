import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { IHero } from '../models/Hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesState {
  _heroes: WritableSignal<IHero[]> = signal<IHero[]>([]);

  constructor() {
    this.loadFromLS();
  }

  get heroes(): Signal<IHero[]> {
    return this._heroes.asReadonly();
  }

  set heroes(heroes: IHero[]) {
    this._heroes.set(heroes);
  }

  private saveToLSHeroes() {
    localStorage.setItem('heroes', JSON.stringify(this.heroes()));
  }

  private getHeroesFromLS(): IHero[] | null {
    const heroesLS = localStorage.getItem('heroes');
    return heroesLS ? JSON.parse(heroesLS) : null;
  }

  private loadFromLS() {
    const heroesLS = this.getHeroesFromLS();
    if (heroesLS) {
      this.heroes = heroesLS;
    }
  }

  addHero(newHero: IHero): void {
    this._heroes.update((currentHeroes) => {
      return [...currentHeroes, newHero];
    });
    this.saveToLSHeroes();
  }

  deleteHero(id: string): void {
    this._heroes.update((currentHeroes) => {
      return currentHeroes.filter((hero) => hero.id !== id);
    });
    this.saveToLSHeroes();
  }

  editHero(editHero: IHero) {
    this._heroes.update((currentHeroes) => {
      return currentHeroes.map((hero) =>
        hero.id === editHero.id ? editHero : hero,
      );
    });
    this.saveToLSHeroes();
  }
}
