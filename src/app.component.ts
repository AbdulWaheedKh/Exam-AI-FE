import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const isAuthRoute = event.url.startsWith('/auth');
      const isAuthenticated = this.apiService.isAuthenticated();

      if (!isAuthenticated && !isAuthRoute) {
        this.router.navigate(['/auth/login']);
      } else if (isAuthenticated && isAuthRoute) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
} 