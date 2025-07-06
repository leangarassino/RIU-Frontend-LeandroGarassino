import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';

export const routes: Routes = [
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
