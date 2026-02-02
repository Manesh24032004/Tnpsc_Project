/**
 * API Configuration - MongoDB Backend Only
 */

// MongoDB Backend URL
export const MONGODB_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',

  // Users
  USERS: '/users',
  USER_ROLES: '/users/roles',

  // Documents
  DOCUMENTS: '/documents',
  DOCUMENTS_BY_CATEGORY: (category: string) => `/documents/category/${category}`,
  DOCUMENT_DOWNLOAD: (id: string) => `/documents/${id}/download`,

  // Images
  IMAGES: '/images',
  IMAGES_BY_CATEGORY: (category: string) => `/images/category/${category}`,
  IMAGE_UPLOAD: '/images/upload',

  // Files (Storage)
  FILES_UPLOAD: '/files/upload',
  FILES_DELETE: '/files/delete',
};
