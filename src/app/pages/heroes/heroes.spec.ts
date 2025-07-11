import { RouterTestingModule } from '@angular/router/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Heroes } from './heroes';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IHero } from '../../models/Hero.model';
import { signal, Type, WritableSignal } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TableCell } from '../../components/table/table';
import { AlertDialog } from '../../components/alert-dialog/alert-dialog';

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
    gender: 'Masculino',
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
    category: 'Tecnológico',
    gender: 'Masculino',
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
    category: 'Alienígena',
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

class MockHeroesService {
  heroes: WritableSignal<IHero[]> = signal(TEST_HEROES);

  searchHeroesByName(term: string): IHero[] {
    if (!term || term.trim() === '') {
      return this.heroes();
    }
    const lowerCaseTerm = term.toLowerCase();
    return this.heroes().filter((hero) =>
      hero.name.toLowerCase().includes(lowerCaseTerm),
    );
  }

  deleteHero(id: string) {
    this.heroes.update((currentHeroes) =>
      currentHeroes.filter((hero) => hero.id !== id),
    );
    return this.heroes();
  }
}

class MockMatDialog {
  private _afterClosedSubject = new Subject<any>();
  open<T, D = any, R = any>(
    component: Type<T>,
    config?: D,
  ): MatDialogRef<T, R> {
    const mockDialogRef: Partial<MatDialogRef<T, R>> = {
      afterClosed: () => this._afterClosedSubject.asObservable(),
      close: jasmine.createSpy('close').and.returnValue(undefined),
    };
    return mockDialogRef as MatDialogRef<T, R>;
  }

  emitAfterClosed(result: any) {
    this._afterClosedSubject.next(result);
    this._afterClosedSubject = new Subject<any>();
  }
}

describe('Heroes', () => {
  let component: Heroes;
  let fixture: ComponentFixture<Heroes>;
  let router: Router;
  let heroesService: MockHeroesService;
  let dialogOpenSpy: jasmine.Spy;
  let dialog: MockMatDialog;
  let heroesServiceSearchSpy: jasmine.Spy;
  let heroesServiceDeleteSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Heroes,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
      ],
      providers: [
        { provide: HeroesService, useClass: MockHeroesService },
        { provide: MatDialog, useClass: MockMatDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Heroes);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    heroesService = TestBed.inject(
      HeroesService,
    ) as unknown as MockHeroesService;
    dialog = TestBed.inject(MatDialog) as unknown as MockMatDialog;
    dialogOpenSpy = spyOn(dialog, 'open').and.callThrough();
    heroesServiceSearchSpy = spyOn(
      heroesService,
      'searchHeroesByName',
    ).and.callThrough();
    heroesServiceDeleteSpy = spyOn(
      heroesService,
      'deleteHero',
    ).and.callThrough();
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

  it('should return default columns if dataHeroes has items', () => {
    component.dataHeroes.set(TEST_HEROES);
    fixture.detectChanges();

    expect(component.colums()).toEqual([
      'name',
      'category',
      'gender',
      'isRetired',
      'actions',
    ]);
  });

  it('should return an empty array for columns if dataHeroes is empty', () => {
    component.dataHeroes.set([]);
    fixture.detectChanges();

    expect(component.colums()).toEqual([]);
  });

  it('should re-apply search filter after hero deletion if a search term is present', fakeAsync(() => {
    const activeSearchTerm = 'man';
    component.searchControl.setValue(activeSearchTerm);
    component.dataHeroes.set(
      heroesService.searchHeroesByName(activeSearchTerm),
    );

    expect(component.dataHeroes().length).toBe(TEST_HEROES.length);
    expect(component.dataHeroes().map((h) => h.name)).toEqual([
      'Spiderman',
      'Superman',
      'Batman',
      'Wonder Woman',
    ]);
    const heroToDelete = TEST_HEROES[0];
    const heroToDeleteId = heroToDelete.id;
    const heroToDeleteEvent: Record<string, TableCell> =
      heroToDelete as unknown as Record<string, TableCell>;

    component.onDelete(heroToDeleteEvent);

    dialog.emitAfterClosed(true);
    tick();

    expect(dialogOpenSpy).toHaveBeenCalledTimes(1);
    expect(dialogOpenSpy).toHaveBeenCalledWith(
      AlertDialog,
      jasmine.any(Object),
    );
    // Chequea el DeleteHeroService
    expect(heroesServiceDeleteSpy).toHaveBeenCalledTimes(1);
    expect(heroesServiceDeleteSpy).toHaveBeenCalledWith(heroToDeleteId);
    // Chequea que se llame dos veces al método de búsqueda
    expect(heroesServiceSearchSpy).toHaveBeenCalledTimes(2);
    expect(heroesServiceSearchSpy).toHaveBeenCalledWith(activeSearchTerm);

    const expectedHeroesAfterDeletionAndRefilter = [
      TEST_HEROES[1],
      TEST_HEROES[2],
      TEST_HEROES[3],
    ];
    // Chequea que se haya eliminado el héroe
    expect(component.dataHeroes()).toEqual(
      expectedHeroesAfterDeletionAndRefilter,
    );
    // Chequea que se haya eliminado el héroe
    expect(component.dataHeroes().length).toBe(3);
  }));
});
