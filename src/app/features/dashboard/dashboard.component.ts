import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { UserProfile } from '../auth/models/auth.model';

interface SubjectData {
  name: string;
  score: number;
}

interface ExamData {
  status: string;
  count: number;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  user: UserProfile | null = null;
  
  // Performance data
  performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [65, 70, 75, 80, 85, 90]
  };
  
  // Subject performance data
  subjectData: SubjectData[] = [
    { name: 'Math', score: 85 },
    { name: 'Science', score: 75 },
    { name: 'English', score: 90 },
    { name: 'History', score: 70 },
    { name: 'Art', score: 80 }
  ];
  
  // Exam completion data
  examData: ExamData[] = [
    { status: 'Completed', count: 5, color: '#4CAF50' },
    { status: 'In Progress', count: 3, color: '#FFC107' },
    { status: 'Not Started', count: 2, color: '#F44336' }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }
  
  // Helper method to calculate percentage for progress bars
  getPercentage(value: number, max: number): number {
    return (value / max) * 100;
  }
} 