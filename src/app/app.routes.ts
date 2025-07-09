import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Heroes } from './pages/heroes/heroes';
import { Create } from './pages/create/create';
import { Hero } from './pages/hero/hero';
import { HeroesLayout } from './pages/heroes-layout/heroes-layout';
import { Edit } from './pages/edit/edit';
import { checkHeroeGuard } from './guards/check-heroe-guard';

export const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesLayout,
    children: [
      {
        path: '',
        component: Heroes,
      },
      {
        path: 'hero/:id',
        component: Hero,
        canActivate: [checkHeroeGuard],
      },
      {
        path: 'edit/:id',
        component: Edit,
        canActivate: [checkHeroeGuard],
      },
      {
        path: 'create',
        component: Create,
      },
    ],
  },
  {
    path: 'welcome',
    component: Welcome,
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
];
