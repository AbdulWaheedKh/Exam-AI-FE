import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, LoginCredentials, AuthResponse } from '../../../src/app/models/user.interface';
import { Exam, Question, ExamSubmission } from '../../../src/app/models/exam.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // Update this with your backend URL
  private token: string | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  // Auth endpoints
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, user);
  }

  // User endpoints
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`, { headers: this.getHeaders() });
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, userData, { headers: this.getHeaders() });
  }

  // Exam endpoints
  createExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(`${this.apiUrl}/exams`, exam, { headers: this.getHeaders() });
  }

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${this.apiUrl}/exams`, { headers: this.getHeaders() });
  }

  getExamById(examId: string): Observable<Exam> {
    return this.http.get<Exam>(`${this.apiUrl}/exams/${examId}`, { headers: this.getHeaders() });
  }

  updateExam(examId: string, examData: Partial<Exam>): Observable<Exam> {
    return this.http.put<Exam>(`${this.apiUrl}/exams/${examId}`, examData, { headers: this.getHeaders() });
  }

  deleteExam(examId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/exams/${examId}`, { headers: this.getHeaders() });
  }

  // Question endpoints
  addQuestion(examId: string, question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/exams/${examId}/questions`, question, { headers: this.getHeaders() });
  }

  getQuestions(examId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/exams/${examId}/questions`, { headers: this.getHeaders() });
  }

  updateQuestion(examId: string, questionId: string, questionData: Partial<Question>): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/exams/${examId}/questions/${questionId}`, questionData, { headers: this.getHeaders() });
  }

  deleteQuestion(examId: string, questionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/exams/${examId}/questions/${questionId}`, { headers: this.getHeaders() });
  }

  // Exam submission endpoints
  submitExam(examId: string, submission: ExamSubmission): Observable<ExamSubmission> {
    return this.http.post<ExamSubmission>(`${this.apiUrl}/exams/${examId}/submissions`, submission, { headers: this.getHeaders() });
  }

  getSubmissions(examId: string): Observable<ExamSubmission[]> {
    return this.http.get<ExamSubmission[]>(`${this.apiUrl}/exams/${examId}/submissions`, { headers: this.getHeaders() });
  }

  getSubmissionById(examId: string, submissionId: string): Observable<ExamSubmission> {
    return this.http.get<ExamSubmission>(`${this.apiUrl}/exams/${examId}/submissions/${submissionId}`, { headers: this.getHeaders() });
  }

  // Helper methods
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
} 