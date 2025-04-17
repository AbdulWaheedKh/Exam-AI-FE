import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/auth.model';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  userRoles = Object.values(UserRole);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: [UserRole.STUDENT, Validators.required],
      grade: [null]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Update grade validation when role changes
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      const gradeControl = this.registerForm.get('grade');
      if (role === UserRole.STUDENT) {
        gradeControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
      } else {
        gradeControl?.clearValidators();
      }
      gradeControl?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { confirmPassword, ...formData } = this.registerForm.value;
      
      // Only include grade if role is student
      const registerData = {
        ...formData,
        grade: formData.role === UserRole.STUDENT ? formData.grade : undefined
      };

      this.authService.register(registerData)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.errorMessage = error.error.message || 'An error occurred during registration';
          }
        });
    }
  }
} 