/**
 * API Services Index
 * 
 * Central export for all API services.
 * These services abstract the backend implementation,
 * making it easy to switch between Supabase and MongoDB.
 */

export * from './types';
export * from './config';
export { authService } from './authService';
export { documentService } from './documentService';
export { imageService } from './imageService';
