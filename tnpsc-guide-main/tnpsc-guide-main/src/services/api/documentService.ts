/**
 * Document Service - MongoDB Backend Only
 */

import { MONGODB_API_URL, API_ENDPOINTS } from './config';
import { authService } from './authService';
import type { Document, DocumentUploadRequest, ApiResponse } from './types';

class DocumentService {
  private getHeaders() {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    const userId = authService.getUserId();
    if (userId) {
      headers['user-id'] = userId;
    }
    return headers;
  }

  // Get all documents from MongoDB
  async getDocuments(category?: string): Promise<ApiResponse<Document[]>> {
    try {
      const url = category
        ? `${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS_BY_CATEGORY(category)}`
        : `${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}`;

      const response = await fetch(url, { headers: this.getHeaders() });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Upload document to MongoDB
  async uploadDocument(request: DocumentUploadRequest): Promise<ApiResponse<Document>> {
    try {
      const formData = new FormData();
      formData.append('file', request.file);
      formData.append('title', request.title);
      formData.append('category', request.category);
      if (request.description) formData.append('description', request.description);
      if (request.subcategory) formData.append('subcategory', request.subcategory);

      const userId = authService.getUserId();
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}`, {
        method: 'POST',
        headers: userId ? { 'user-id': userId } : {},
        body: formData,
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Update document in MongoDB
  async updateDocument(id: string, updates: Partial<Document>): Promise<ApiResponse<Document>> {
    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}/${id}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(updates),
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Delete document from MongoDB
  async deleteDocument(id: string, filePath: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get public URL for document
  getPublicUrl(filePath: string): string {
    return `${MONGODB_API_URL}/files/${filePath}`;
  }

  // Increment download count in MongoDB
  async incrementDownload(id: string): Promise<void> {
    await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENT_DOWNLOAD(id)}`, {
      method: 'POST',
      headers: this.getHeaders(),
    });
  }
}

export const documentService = new DocumentService();
