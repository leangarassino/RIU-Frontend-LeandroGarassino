import { HeroesState } from './heroes.state';
import { IHero } from '../models/Hero.model';
import { v4 as uuidv4 } from 'uuid';

const TEST_HEROES_STATIC: IHero[] = [
  {
    id: 'static-hero-1',
    name: 'Spiderman',
    history: 'Friendly neighborhood hero, he is a good man',
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
    id: 'static-hero-2',
    name: 'Superman',
    history: 'Man of Steel is the best heroe',
    category: 'Galáctico',
    gender: 'Masculino',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==',
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
    id: 'static-hero-3',
    name: 'Batman',
    history: 'The Dark Knight in the shadow',
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
    id: 'static-hero-4',
    name: 'Wonder Woman',
    history: 'Amazonian princess always like beatiful',
    category: 'Humano',
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

describe('HeroesState', () => {
  let heroesState: HeroesState;
  let localStorageMock: {
    getItem: jasmine.Spy;
    setItem: jasmine.Spy;
    clear: jasmine.Spy;
  };

  beforeEach(() => {
    localStorageMock = {
      getItem: jasmine.createSpy('localStorage.getItem'),
      setItem: jasmine.createSpy('localStorage.setItem'),
      clear: jasmine.createSpy('localStorage.clear'),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    heroesState = new HeroesState();
    heroesState.heroes = [...TEST_HEROES_STATIC];
  });

  afterEach(() => {
    localStorageMock.clear();
  });
  it('debe inicializarse con un array vacío si localStorage está vacío', () => {
    localStorageMock.getItem.and.returnValue(null);
    const tempHeroesState = new HeroesState();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('heroes');
    expect(tempHeroesState.heroes()).toEqual([]);
  });

  it('debe cargar los héroes desde localStorage si hay datos guardados', () => {
    localStorageMock.getItem.and.returnValue(
      JSON.stringify(TEST_HEROES_STATIC),
    );
    const tempHeroesState = new HeroesState();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('heroes');
    expect(tempHeroesState.heroes()).toEqual(TEST_HEROES_STATIC);
  });
  it('debe actualizar _heroes signal cuando se usa el setter y no guardar en localStorage', () => {
    const newHeroList: IHero[] = [
      {
        id: 'setter-id-1',
        name: 'Setter Hero',
        history: '',
        category: '',
        gender: '',
        image: '',
        isRetired: false,
        powers: [],
        stats: {} as any,
      },
    ];
    heroesState.heroes = newHeroList;
    expect(heroesState.heroes()).toEqual(newHeroList);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('debe agregar un nuevo héroe y guardarlo en localStorage', () => {
    heroesState = new HeroesState();
    localStorageMock.getItem.and.returnValue(null);

    const newHero: IHero = {
      id: uuidv4(),
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
    };

    const expectedHeroesList = [newHero];

    heroesState.addHero(newHero);

    expect(heroesState.heroes()).toEqual(expectedHeroesList);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'heroes',
      JSON.stringify(expectedHeroesList),
    );
  });

  it('debe eliminar un héroe por ID y guardar en localStorage', () => {
    const idToDelete = TEST_HEROES_STATIC[0].id;
    const expectedHeroes = TEST_HEROES_STATIC.filter(
      (hero) => hero.id !== idToDelete,
    );

    const result = heroesState.deleteHero(idToDelete);
    expect(heroesState.heroes()).toEqual(expectedHeroes);
    expect(result).toEqual(expectedHeroes);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'heroes',
      JSON.stringify(expectedHeroes),
    );
  });

  it('no debe eliminar nada si el ID no existe y debe guardar el estado actual', () => {
    const initialHeroes = heroesState.heroes();
    const result = heroesState.deleteHero('non-existent-id');
    expect(heroesState.heroes()).toEqual(initialHeroes);
    expect(result).toEqual(initialHeroes);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'heroes',
      JSON.stringify(initialHeroes),
    );
  });

  it('debe editar un héroe existente y guardarlo en localStorage', () => {
    const editedHero: IHero = {
      ...TEST_HEROES_STATIC[0],
      name: 'Spiderman Edited',
      isRetired: true,
    };

    const expectedHeroes = [
      editedHero,
      TEST_HEROES_STATIC[1],
      TEST_HEROES_STATIC[2],
      TEST_HEROES_STATIC[3],
    ];

    heroesState.editHero(editedHero);
    expect(heroesState.heroes()).toEqual(expectedHeroes);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'heroes',
      JSON.stringify(expectedHeroes),
    );
  });

  it('no debe cambiar nada si se intenta editar un héroe inexistente y debe guardar el estado actual', () => {
    const initialHeroes = heroesState.heroes();
    const nonExistentEditedHero: IHero = {
      id: 'non-existent',
      name: 'Ghost Hero',
      history: '',
      category: '',
      gender: '',
      image: '',
      isRetired: false,
      powers: [],
      stats: {} as any,
    };

    heroesState.editHero(nonExistentEditedHero);
    expect(heroesState.heroes()).toEqual(initialHeroes);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'heroes',
      JSON.stringify(initialHeroes),
    );
  });
});
