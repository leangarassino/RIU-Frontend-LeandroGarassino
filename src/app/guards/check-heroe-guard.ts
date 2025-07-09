import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HeroesService } from '../services/heroes.service';
import { IHero } from '../models/Hero.model';
import { MatDialog } from '@angular/material/dialog';
import {
  AlertDialog,
  AlertDialogData,
} from '../components/alert-dialog/alert-dialog';

export const checkHeroeGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const heroesService = inject(HeroesService);
  const heroId = route.paramMap.get('id');
  const dialog = inject(MatDialog);
  if (!heroId) {
    return false;
  }
  const hero: IHero | undefined = heroesService.getHero(heroId);
  if (!hero) {
    dialog.open<AlertDialog, AlertDialogData>(AlertDialog, {
      data: {
        title: 'Ha ocurrido un error',
        content: `No se encontro el héroe con el id: ${heroId}`,
      },
    });
    router.navigate(['welcome']);
    return false;
  }
  return true;
};
