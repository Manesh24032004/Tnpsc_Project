/**
 * API Types for MongoDB Backend Integration
 * 
 * These types mirror the database schema and should be used
 * throughout the application for type safety.
 */

// User & Authentication
export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string; // Only for registration, never returned from API
  createdAt: string;
  updatedAt: string;
}

export interface UserRole {
  _id: string;
  userId: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

// Documents (PDFs, Notes, Papers, etc.)
export interface Document {
  _id: string;
  title: string;
  description?: string;
  category: 'syllabus' | 'previous-papers' | 'notes' | 'books' | 'tirukural' | 'tamil-scholars';
  subcategory?: string;
  filePath: string;
  fileName: string;
  fileSize?: number;
  downloadCount: number;
  uploadedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentUploadRequest {
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  file: File;
}

// Images (Logos, Tamil Scholars, Book Covers, etc.)
export interface ImageRecord {
  _id: string;
  title: string;
  description?: string;
  category: 'logos' | 'tamil-scholars' | 'book-covers' | 'poets' | 'standards' | 'subjects' | 'carousel' | 'general';
  subcategory?: string;
  fileName: string;
  filePath: string;
  fileSize?: number;
  url: string;
  createdAt: string;
}

export interface ImageUploadRequest {
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  file: File;
}

// Profile
export interface Profile {
  _id: string;
  userId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
