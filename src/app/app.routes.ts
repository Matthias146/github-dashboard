import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
  },
];
