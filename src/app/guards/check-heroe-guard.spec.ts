import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { checkHeroeGuard } from './check-heroe-guard';
import { HeroesService } from '../services/heroes.service';
import { IHero } from '../models/Hero.model';
import { AlertDialog } from '../components/alert-dialog/alert-dialog';
import { v4 as uuidv4 } from 'uuid';

const TEST_HERO: IHero = {
  id: uuidv4(),
  name: 'Spiderman',
  history: 'Friendly neighborhood hero',
  category: 'Mágico',
  gender: 'Masculino',
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
  isRetired: false,
  powers: [
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  stats: {
    strength: 80,
    intelligence: 90,
    speed: 70,
    durability: 60,
    defense: 75,
    combatSkill: 85,
  },
};

describe('checkHeroeGuard', () => {
  let router: Router;
  let heroesService: HeroesService;
  let dialog: MatDialog;

  let getHeroSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;
  let dialogOpenSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Router, HeroesService, MatDialog],
    });

    router = TestBed.inject(Router);
    heroesService = TestBed.inject(HeroesService);
    dialog = TestBed.inject(MatDialog);

    getHeroSpy = spyOn(heroesService, 'getHero');
    navigateSpy = spyOn(router, 'navigate').and.returnValue(
      Promise.resolve(true),
    );
    dialogOpenSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as any);
  });

  it('should return false and not navigate if no heroId is provided', () => {
    const mockRoute = {
      paramMap: {
        get: (key: string) => null,
      },
    } as unknown as ActivatedRouteSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      checkHeroeGuard(mockRoute, {} as any),
    );

    expect(result).toBeFalse();
    expect(getHeroSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(dialogOpenSpy).not.toHaveBeenCalled();
  });

  it('should return false, open dialog, and navigate to welcome if hero is not found', () => {
    const nonExistentId = '999';
    const mockRoute = {
      paramMap: {
        get: (key: string) => nonExistentId,
      },
    } as unknown as ActivatedRouteSnapshot;

    getHeroSpy.and.returnValue(undefined);

    const result = TestBed.runInInjectionContext(() =>
      checkHeroeGuard(mockRoute, {} as any),
    );

    expect(result).toBeFalse();
    expect(getHeroSpy).toHaveBeenCalledOnceWith(nonExistentId);
    expect(dialogOpenSpy).toHaveBeenCalledTimes(1);
    expect(dialogOpenSpy).toHaveBeenCalledWith(AlertDialog, {
      data: {
        title: 'Ha ocurrido un error',
        content: `No se encontro el héroe con el id: ${nonExistentId}`,
      },
    });
    expect(navigateSpy).toHaveBeenCalledOnceWith(['welcome']);
  });

  it('should return true and not navigate or open dialog if hero is found', () => {
    const existentId = TEST_HERO.id;
    const mockRoute = {
      paramMap: {
        get: (key: string) => existentId,
      },
    } as unknown as ActivatedRouteSnapshot;

    getHeroSpy.and.returnValue(TEST_HERO);

    const result = TestBed.runInInjectionContext(() =>
      checkHeroeGuard(mockRoute, {} as any),
    );

    expect(result).toBeTrue();
    expect(getHeroSpy).toHaveBeenCalledOnceWith(existentId);
    expect(navigateSpy).not.toHaveBeenCalled();
    expect(dialogOpenSpy).not.toHaveBeenCalled();
  });
});
