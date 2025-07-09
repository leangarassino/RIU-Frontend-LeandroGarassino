import {
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { Table, TableCell } from '../../components/table/table';
import { Link } from '../../components/link/link';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { IHero } from '../../models/Hero.model';
import { InputComponent } from '../../components/input/input';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  AlertDialog,
  AlertDialogData,
} from '../../components/alert-dialog/alert-dialog';
import { Button } from '../../components/button/button';
@Component({
  selector: 'app-heroes',
  imports: [Table, Link, InputComponent, Button],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
})
export class Heroes {
  router = inject(Router);
  heroesService = inject(HeroesService);
  dataHeroes: WritableSignal<IHero[]> = signal(this.heroesService.heroes());
  dialog = inject(MatDialog);
  colums = computed<string[]>(() => {
    if (this.dataHeroes().length > 0) {
      return ['name', 'category', 'gender', 'isRetired', 'actions'];
    } else {
      return [];
    }
  });
  heroesForTable = computed<Record<string, TableCell>[]>(() => {
    return this.dataHeroes().map((hero: IHero) => ({
      id: hero.id,
      name: hero.name,
      history: hero.history,
      category: hero.category,
      gender: hero.gender,
      isRetired: hero.isRetired,
    }));
  });
  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.subscribe((searchTerm) => {
      if (!searchTerm) {
        this.dataHeroes.set(this.heroesService.heroes());
      }
    });
  }

  navigateEdit(event: Record<string, TableCell>) {
    this.router.navigate(['heroes/edit', event['id']]);
  }

  navigateHero(event: Record<string, TableCell>) {
    this.router.navigate(['heroes/hero', event['id']]);
  }

  onDelete(event: Record<string, TableCell>) {
    this.dialog
      .open<AlertDialog, AlertDialogData>(AlertDialog, {
        data: {
          title: 'Eliminar héroe',
          content: '¿Estás seguro que deseas eliminar el héroe?',
          acceptLabel: 'Eliminar',
          cancelLabel: 'Cancelar',
        },
      })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          const id = event['id'] as string;
          const heroes = this.heroesService.deleteHero(id);
          this.dataHeroes.set(heroes);
        }
      });
  }

  search() {
    const searchTerm = this.searchControl.value;
    if (searchTerm) {
      const heroes = this.heroesService.searchHeroesByName(searchTerm);
      this.dataHeroes.set(heroes);
    }
  }
}
