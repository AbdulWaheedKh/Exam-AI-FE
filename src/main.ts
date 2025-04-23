import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/features/dashboard/dashboard.component';
import { ProfileComponent } from './app/features/profile/profile.component';
import { PdfUploadComponent } from './app/components/pdf-upload/pdf-upload.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full' as const
  },
  {
    path: 'auth',
    loadChildren: () => import('./app/features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'pdf-upload',
    component: PdfUploadComponent
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
