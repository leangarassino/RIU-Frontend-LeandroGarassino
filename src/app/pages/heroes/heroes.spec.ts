import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Heroes } from './heroes';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IHero } from '../../models/Hero.model';
import { signal, WritableSignal } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

const TEST_HEROES: IHero[] = [
  {
    id: '1',
    name: 'Spiderman',
    history: 'Friendly neighborhood hero',
    category: 'Marvel',
    gender: 'Male',
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
  },
  {
    id: '2',
    name: 'Superman',
    history: 'Man of Steel',
    category: 'DC',
    gender: 'Male',
    image:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfJwgKCwswMDA+Hyw8NDAxLS0tJjVh',
    isRetired: false,
    powers: [
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
    ],
    stats: {
      strength: 100,
      intelligence: 95,
      speed: 100,
      durability: 100,
      defense: 95,
      combatSkill: 90,
    },
  },
  {
    id: '3',
    name: 'Batman',
    history: 'The Dark Knight',
    category: 'DC',
    gender: 'Male',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    isRetired: true,
    powers: [
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
    ],
    stats: {
      strength: 70,
      intelligence: 100,
      speed: 60,
      durability: 70,
      defense: 90,
      combatSkill: 100,
    },
  },
  {
    id: '4',
    name: 'Wonder Woman',
    history: 'Amazonian princess',
    category: 'DC',
    gender: 'Female',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    isRetired: false,
    powers: [
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
    ],
    stats: {
      strength: 95,
      intelligence: 85,
      speed: 80,
      durability: 90,
      defense: 88,
      combatSkill: 92,
    },
  },
];

class MockHeroesService {
  heroes: WritableSignal<IHero[]> = signal(TEST_HEROES);
}

describe('Heroes', () => {
  let component: Heroes;
  let fixture: ComponentFixture<Heroes>;
  let router: Router;
  let heroesService: MockHeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Heroes,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
      ],
      providers: [{ provide: HeroesService, useClass: MockHeroesService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Heroes);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    heroesService = TestBed.inject(
      HeroesService,
    ) as unknown as MockHeroesService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to edit hero form when navigateEdit is called', () => {
    const heroId = heroesService.heroes()[0].id;
    component.navigateEdit({ id: heroId });
    expect(router.navigate).toHaveBeenCalledWith(['heroes/edit', heroId]);
  });

  it('should navigate to hero detail form when navigateHero is called', () => {
    const heroId = heroesService.heroes()[1].id;
    component.navigateHero({ id: heroId });
    expect(router.navigate).toHaveBeenCalledWith(['heroes/hero', heroId]);
  });
});
