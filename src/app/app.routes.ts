import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { Heroes } from './pages/heroes/heroes';
import { Create } from './pages/create/create';
import { Hero } from './pages/hero/hero';
import { HeroesLayout } from './pages/heroes-layout/heroes-layout';
import { Edit } from './pages/edit/edit';

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
      },
      {
        path: 'edit/:id',
        component: Edit,
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
