import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { User } from '../../../../models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  isTeacher = false;
  isStudent = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.apiService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loadUserData();
  }

  private loadUserData(): void {
    this.apiService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.isTeacher = user.role === 'teacher';
        this.isStudent = user.role === 'student';
      },
      error: () => {
        this.apiService.clearToken();
        this.router.navigate(['/auth/login']);
      }
    });
  }

  logout(): void {
    this.apiService.clearToken();
    this.router.navigate(['/auth/login']);
  }
} 