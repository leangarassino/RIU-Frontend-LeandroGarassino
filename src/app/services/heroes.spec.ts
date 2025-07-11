import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HeroesState } from '../state/heroes.state';
import { IHero } from '../models/Hero.model';
import { Signal, signal, WritableSignal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

class MockHeroesState {
  private _mockHeroes: WritableSignal<IHero[]> = signal<IHero[]>([]);

  get heroes(): Signal<IHero[]> {
    return this._mockHeroes.asReadonly();
  }

  addHero = jasmine.createSpy('addHero').and.callFake((hero: IHero) => {
    this._mockHeroes.update((current) => [...current, hero]);
  });
  deleteHero = jasmine.createSpy('deleteHero').and.callFake((id: string) => {
    this._mockHeroes.update((current) => current.filter((h) => h.id !== id));
  });
  editHero = jasmine.createSpy('editHero').and.callFake((hero: IHero) => {
    this._mockHeroes.update((current) =>
      current.map((h) => (h.id === hero.id ? hero : h)),
    );
  });

  setHeroes(heroes: IHero[]): void {
    this._mockHeroes.set(heroes);
  }
}

describe('HeroesService', () => {
  let service: HeroesService;
  let mockHeroesState: MockHeroesState;
  const TEST_HEROES: IHero[] = [
    {
      id: uuidv4(),
      name: 'Spiderman',
      history: 'Friendly neighborhood hero',
      category: 'Mutante',
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
      name: 'Superman',
      history: 'Man of Steel',
      category: 'Humano',
      gender: 'Femenino',
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
      id: uuidv4(),
      name: 'Batman',
      history: 'The Dark Knight',
      category: 'Mutante',
      gender: 'No binario',
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
      id: uuidv4(),
      name: 'Wonder Woman',
      history: 'Amazonian princess',
      category: 'Mutante',
      gender: 'Femenino',
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroesService,
        { provide: HeroesState, useClass: MockHeroesState },
      ],
    });

    service = TestBed.inject(HeroesService);
    mockHeroesState = TestBed.inject(HeroesState) as unknown as MockHeroesState;

    mockHeroesState.setHeroes(TEST_HEROES);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get heroes', () => {
    it('should return all heroes from HeroesState with full IHero properties', () => {
      expect(service.heroes()).toEqual(TEST_HEROES);
      expect(service.heroes()[0].image).toBe(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      );
      expect(service.heroes()[1].powers.length).toBe(11);
      expect(service.heroes()[2].stats.intelligence).toBe(100);
    });
  });

  describe('addHero', () => {
    it('should call HeroesState.addHero with a new hero including all properties', () => {
      const newHero: IHero = {
        id: '5',
        name: 'Captain Marvel',
        history: 'Kree warrior',
        category: 'Humano',
        gender: 'Femenino',
        image:
          'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfJwgKCwswMDA+Hyw8NDAxLS0tJjVh',
        isRetired: false,
        powers: [true, true, true, false],
        stats: {
          strength: 98,
          intelligence: 80,
          speed: 95,
          durability: 90,
          defense: 85,
          combatSkill: 88,
        },
      };
      service.addHero(newHero);
      expect(mockHeroesState.addHero).toHaveBeenCalledWith(newHero);
      expect(service.heroes()).toContain(newHero);
    });
  });

  describe('deleteHero', () => {
    it('should call HeroesState.deleteHero and remove the hero from the state', () => {
      const idToDelete = TEST_HEROES[2].id;
      service.deleteHero(idToDelete);
      expect(mockHeroesState.deleteHero).toHaveBeenCalledWith(idToDelete);
      expect(service.heroes().find((h) => h.id === idToDelete)).toBeUndefined();
      expect(service.heroes().length).toBe(TEST_HEROES.length - 1);
    });
  });

  describe('editHero', () => {
    it('should call HeroesState.editHero with the updated hero and reflect changes in state', () => {
      const updatedHero: IHero = {
        ...TEST_HEROES[0],
        name: 'The Amazing Spiderman',
        isRetired: true,
        stats: { ...TEST_HEROES[0].stats, strength: 90 },
      };
      service.editHero(updatedHero);
      expect(mockHeroesState.editHero).toHaveBeenCalledWith(updatedHero);
      const foundHero = service.heroes().find((h) => h.id === updatedHero.id);
      expect(foundHero?.name).toBe('The Amazing Spiderman');
      expect(foundHero?.isRetired).toBe(true);
      expect(foundHero?.stats.strength).toBe(90);
    });
  });

  describe('getHero', () => {
    it('should return a hero by its ID with complete details', () => {
      const hero = service.getHero(TEST_HEROES[0].id);
      expect(hero).toEqual(TEST_HEROES[0]);
      expect(hero?.image).toBe(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
      );
      expect(hero?.stats.combatSkill).toBe(85);
    });

    it('should return undefined if hero ID does not exist', () => {
      const hero = service.getHero('99');
      expect(hero).toBeUndefined();
    });
  });

  describe('searchHeroesByName', () => {
    it('should return heroes whose names contain the search term (case-insensitive) with full data', () => {
      const results = service.searchHeroesByName('man');
      expect(results.length).toBe(4);
      expect(results).toEqual(
        jasmine.arrayContaining([
          TEST_HEROES[0],
          TEST_HEROES[1],
          TEST_HEROES[2],
        ]),
      );
      expect(results[0].category).toBe('Mutante');
      expect(results[1].image).toBe(
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfJwgKCwswMDA+Hyw8NDAxLS0tJjVh',
      );
    });

    it('should return all heroes if search term is an empty string', () => {
      const results = service.searchHeroesByName('');
      expect(results).toEqual(TEST_HEROES);
    });

    it('should return all heroes if search term is null', () => {
      const results = service.searchHeroesByName(null);
      expect(results).toEqual(TEST_HEROES);
    });

    it('should return an empty array if no heroes match the search term', () => {
      const results = service.searchHeroesByName('nonexistent');
      expect(results.length).toBe(0);
      expect(results).toEqual([]);
    });
  });
});
