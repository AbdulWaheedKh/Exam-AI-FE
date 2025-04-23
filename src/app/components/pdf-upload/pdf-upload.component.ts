import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PdfService } from '../../services/pdf.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class PdfUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private pdfService: PdfService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.uploadForm.patchValue({ file });
    } else {
      this.snackBar.open('Please select a valid PDF file', 'Close', {
        duration: 3000
      });
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      const title = this.uploadForm.get('title')?.value;
      
      this.pdfService.uploadPdf(this.selectedFile, title).subscribe({
        next: (response) => {
          console.log('Upload successful, response:', response);
          this.uploadForm.reset();
          this.selectedFile = null;
          
          // Try different navigation methods
          try {
            console.log('Attempting navigation to dashboard...');
            this.router.navigate(['/dashboard']).then(success => {
              console.log('Navigation result:', success);
              if (!success) {
                console.log('Navigation failed, trying alternative method...');
                window.location.href = '/dashboard';
              }
            });
          } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = '/dashboard';
          }
        },
        error: (error) => {
          console.error('Upload error:', error);
          this.snackBar.open('Failed to upload PDF', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
}
