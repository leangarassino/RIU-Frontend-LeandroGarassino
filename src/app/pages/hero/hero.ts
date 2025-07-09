import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { IHero } from '../../models/Hero.model';
import { AVAILABLE_POWERS } from '../../utils/data';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-hero',
  imports: [MatListModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  @Input() id: string = '';
  heroesService = inject(HeroesService);
  router = inject(Router);
  heroData = signal<IHero | null>(null);

  ngOnInit(): void {
    if (this.id) {
      const hero = this.heroesService.getHero(this.id) ?? null;
      if (hero) this.heroData.set(hero);
    }
  }

  getActivePowerNames(powersArray: boolean[]): string | null {
    const activeNames: string[] = [];
    powersArray.forEach((isActive, index) => {
      if (isActive && AVAILABLE_POWERS[index]) {
        activeNames.push(AVAILABLE_POWERS[index]);
      }
    });
    return activeNames.length > 0 ? activeNames.join(', ') : null;
  }
}
