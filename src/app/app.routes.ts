import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'auth/google/callback',
    loadComponent: () =>
      import('./pages/google-callback/google-callback.component').then(
        (m) => m.GoogleCallbackComponent
      ),
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
];
