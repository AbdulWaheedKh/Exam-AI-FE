export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student'
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  grade?: number; // Optional in the request, but required for students
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  grade?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  user: UserProfile;
} 