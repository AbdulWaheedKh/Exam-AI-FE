import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { UserProfile } from '../auth/models/auth.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: UserProfile | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      grade: [null]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          grade: user.grade
        });
        
        // Disable email field as it shouldn't be editable
        this.profileForm.get('email')?.disable();
        
        // Only show grade field for students
        if (user.role !== 'student') {
          this.profileForm.removeControl('grade');
        }
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';
      
      // In a real app, you would call an API to update the profile
      // For now, we'll just simulate a successful update
      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = 'Profile updated successfully!';
        
        // Update the local user data
        if (this.user) {
          const updatedUser = {
            ...this.user,
            name: this.profileForm.get('name')?.value,
            grade: this.profileForm.get('grade')?.value
          };
          
          // Update localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Update the current user subject
          this.authService.updateUserProfile(updatedUser);
        }
      }, 1000);
    }
  }
} 