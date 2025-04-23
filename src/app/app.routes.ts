import { Routes } from '@angular/router';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'exams',
    loadChildren: () => import('./features/exams/exams.module').then(m => m.ExamsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'pdf-upload',
    component: PdfUploadComponent
  }
]; 