import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PdfService, PdfFile } from '../../services/pdf.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
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
    MatSnackBarModule,
    MatTableModule
  ]
})
export class PdfUploadComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  pdfFiles: PdfFile[] = [];
  displayedColumns: string[] = ['title', 'originalFileName', 'createdAt', 'actions'];

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

  ngOnInit() {
    this.loadPdfFiles();
  }

  loadPdfFiles() {
    this.pdfService.getAllPdfs().subscribe({
      next: (files) => {
        this.pdfFiles = files;
      },
      error: (error) => {
        console.error('Error loading PDF files:', error);
        this.snackBar.open('Failed to load PDF files', 'Close', {
          duration: 3000
        });
      }
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
          this.loadPdfFiles(); // Refresh the list
          this.snackBar.open('PDF uploaded successfully', 'Close', {
            duration: 3000
          });
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

  deletePdf(id: string) {
    this.pdfService.deletePdf(id).subscribe({
      next: () => {
        this.loadPdfFiles(); // Refresh the list
        this.snackBar.open('PDF deleted successfully', 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error('Delete error:', error);
        this.snackBar.open('Failed to delete PDF', 'Close', {
          duration: 3000
        });
      }
    });
  }

  generatePdf(id: string | undefined): void {
    if (!id) return;
    console.log('Generate PDF for ID:', id);
    this.pdfService.generatePdfQuiz(id).subscribe({
      next: () => {
        this.loadPdfFiles(); // Refresh the list
        this.snackBar.open('PDF deleted successfully', 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error('Delete error:', error);
        this.snackBar.open('Failed to delete PDF', 'Close', {
          duration: 3000
        });
      }
    });
  }

  quizPdf(id: string | undefined): void {
    if (!id) return;
    console.log('Generate Quiz for ID:', id);
  }


  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
