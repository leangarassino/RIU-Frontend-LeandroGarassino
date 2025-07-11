import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { IHero } from '../../models/Hero.model';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Create } from './create';

class MockHeroesService {
  addHero(hero: IHero) {
    console.log('addHero called with:', hero);
    return of(undefined);
  }
}

describe('Create', () => {
  let component: Create;
  let fixture: ComponentFixture<Create>;
  let heroesService: HeroesService;
  let router: Router;
  let addHeroSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Create, RouterTestingModule],
      providers: [{ provide: HeroesService, useClass: MockHeroesService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Create);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);
    router = TestBed.inject(Router);
    addHeroSpy = spyOn(heroesService, 'addHero').and.callThrough();
    navigateSpy = spyOn(router, 'navigate').and.returnValue(
      Promise.resolve(true),
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call heroesService.addHero and navigate to heroes on addHero event', () => {
    const testHero: IHero = {
      id: uuidv4(),
      name: 'Spiderman',
      history: 'Friendly neighborhood hero',
      category: 'Alienígena',
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
    component.addHero(testHero);

    // Chequea que se llame una vez
    expect(addHeroSpy).toHaveBeenCalledTimes(1);
    // Llamar una vez a heroesService.addHero con el objeto testHero
    expect(addHeroSpy).toHaveBeenCalledWith(testHero);

    // Chequea que el router se llame una vez
    expect(navigateSpy).toHaveBeenCalledTimes(1);
    // Chequea que sea llamado con la ruta 'heroes'
    expect(navigateSpy).toHaveBeenCalledWith(['heroes']);
  });
});
