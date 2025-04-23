import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../features/auth/services/auth.service';

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
} 