import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../features/auth/services/auth.service';

export interface PdfFile {
  id: string;
  title: string;
  originalFileName: string;
  createdAt: Date;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  uploadPdf(file: File, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('title', title);
    formData.append('userId', this.authService.getCurrentUser()?.id || '');

    return this.http.post(`${this.apiUrl}/pdf-raw/upload`, formData);
  }

  getAllPdfs(): Observable<PdfFile[]> {
    // Step 1: Get the user object from localStorage
    const userString = localStorage.getItem('user');

    // Step 2: Parse it to JSON
    const user = userString ? JSON.parse(userString) : null;

    // Step 3: Extract the id
    const userId = user?.id || '';

    console.log(userId);

    return this.http.get<PdfFile[]>(`${this.apiUrl}/pdf-raw/${userId}`);
  }

  deletePdf(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pdf-raw/${id}`);
  }

  generatePdfQuiz(id: string): Observable<any> {
    // Step 1: Get the user object from localStorage
    const userString = localStorage.getItem('user');

    // Step 2: Parse it to JSON
    const user = userString ? JSON.parse(userString) : null;

    // Step 3: Extract the id
    const userId = user?.id || '';

    console.log("Logged-In userID",userId);

    return this.http.get(`${this.apiUrl}/pdf-raw/${id}/userId/${userId}`);
    // return this.http.get(`${this.apiUrl}/pdf-quiz/${id}/userId/${userId}`);
  }
}
