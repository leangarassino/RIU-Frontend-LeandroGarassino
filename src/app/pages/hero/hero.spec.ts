import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { HeroesService } from '../../services/heroes.service';
import { IHero } from '../../models/Hero.model';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { Link } from '../../components/link/link';
import { v4 as uuidv4 } from 'uuid';

export const AVAILABLE_POWERS = [
  'Vuelo',
  'Superfuerza',
  'Velocidad',
  'Invisibilidad',
  'Rayos láser',
  'Telequinesis',
  'Manipulación del tiempo',
  'Regeneración',
  'Control mental',
  'Inmortalidad',
  'Tecnopatía',
];

const TEST_HEROES: IHero[] = [
  {
    id: uuidv4(),
    name: 'Spiderman',
    history: 'Friendly neighborhood hero',
    category: 'Humano',
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
  },
  {
    id: uuidv4(),
    name: 'Batman',
    history: 'The Dark Knight',
    category: 'Tecnológico',
    gender: 'Otro',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    isRetired: true,
    powers: [
      false,
      false,
      false,
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
      strength: 70,
      intelligence: 100,
      speed: 60,
      durability: 70,
      defense: 90,
      combatSkill: 100,
    },
  },
  {
    id: uuidv4(),
    name: 'Superman',
    history: 'Man of Steel',
    category: 'Humano',
    gender: 'Masculino',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
    isRetired: false,
    powers: [true, true, true, true, true, true, true, true, true, true, true],
    stats: {
      strength: 100,
      intelligence: 95,
      speed: 100,
      durability: 100,
      defense: 95,
      combatSkill: 90,
    },
  },
];

class MockHeroesService {
  getHero = jasmine.createSpy('getHero');
}

describe('Hero Component', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let heroesService: MockHeroesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Hero,
        MatListModule,
        Link,
        RouterTestingModule.withRoutes([
          { path: 'heroes', component: class DummyHeroesComponent {} },
          {
            path: 'heroes/hero/:id',
            component: class DummyHeroDetailComponent {},
          },
          { path: '**', component: class DummyComponent {} },
        ]),
      ],
      providers: [{ provide: HeroesService, useClass: MockHeroesService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(
      HeroesService,
    ) as unknown as MockHeroesService;
  });

  it('should call getHero and set heroData if ID is provided', () => {
    heroesService.getHero.and.returnValue(TEST_HEROES[0]);
    component.id = TEST_HEROES[0].id;
    fixture.detectChanges();

    expect(heroesService.getHero).toHaveBeenCalledOnceWith(TEST_HEROES[0].id);
    expect(component.heroData()).toEqual(TEST_HEROES[0]);
  });

  it('should set heroData to null if ID is provided but hero is not found', () => {
    heroesService.getHero.and.returnValue(undefined);
    component.id = 'non-existent-id';
    fixture.detectChanges();

    expect(heroesService.getHero).toHaveBeenCalledOnceWith('non-existent-id');
    expect(component.heroData()).toBeNull();
  });

  it('should not call getHero if no ID is provided', () => {
    component.id = '';
    fixture.detectChanges();

    expect(heroesService.getHero).not.toHaveBeenCalled();
    expect(component.heroData()).toBeNull();
  });

  it('getActivePowerNames should return active power names correctly', () => {
    const powers1 = [
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
    ];
    expect(component.getActivePowerNames(powers1)).toBe('Vuelo, Velocidad');

    const powers2 = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    expect(component.getActivePowerNames(powers2)).toBe('No tiene poderes.');

    const powers3 = [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(component.getActivePowerNames(powers3)).toBe(
      AVAILABLE_POWERS.join(', '),
    );
  });

  it('should display "No tiene poderes." when hero has no active powers', () => {
    const heroWithNoPowers = TEST_HEROES[1];
    component.id = heroWithNoPowers.id;
    fixture.detectChanges();

    const h3Elements = fixture.nativeElement.querySelectorAll('h3');
    let powersTextElement: HTMLParagraphElement | null = null;
    for (let i = 0; i < h3Elements.length; i++) {
      const h3 = h3Elements[i];
      if (h3.textContent && h3.textContent.includes('Poderes:')) {
        powersTextElement = h3.nextElementSibling as HTMLParagraphElement;
        break;
      }
    }

    expect(powersTextElement).toBeTruthy();
    expect(powersTextElement?.textContent?.trim()).toBe('No tiene poderes.');
  });

  it('should display image when hero has an image', () => {
    const heroWithImage = TEST_HEROES[0];
    component.id = heroWithImage.id;
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
  });
});
