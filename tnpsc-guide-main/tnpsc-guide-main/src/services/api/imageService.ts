/**
 * Image Service - MongoDB Backend Only
 */

import { MONGODB_API_URL, API_ENDPOINTS } from './config';
import { authService } from './authService';
import type { ImageRecord, ImageUploadRequest, ApiResponse } from './types';

class ImageService {
  private getHeaders() {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    const userId = authService.getUserId();
    if (userId) {
      headers['user-id'] = userId;
    }
    return headers;
  }

  // Get all images from MongoDB
  async getImages(category?: string): Promise<ApiResponse<ImageRecord[]>> {
    try {
      const url = category
        ? `${MONGODB_API_URL}${API_ENDPOINTS.IMAGES_BY_CATEGORY(category)}`
        : `${MONGODB_API_URL}${API_ENDPOINTS.IMAGES}`;

      const response = await fetch(url, { headers: this.getHeaders() });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Upload image to MongoDB
  async uploadImage(request: ImageUploadRequest): Promise<ApiResponse<ImageRecord>> {
    try {
      const formData = new FormData();
      formData.append('file', request.file);
      formData.append('title', request.title);
      formData.append('category', request.category);
      if (request.description) formData.append('description', request.description);
      if (request.subcategory) formData.append('subcategory', request.subcategory);

      const userId = authService.getUserId();
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.IMAGE_UPLOAD}`, {
        method: 'POST',
        headers: userId ? { 'user-id': userId } : {},
        body: formData,
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Delete image from MongoDB
  async deleteImage(id: string): Promise<ApiResponse<null>> {
    try {
      const userId = authService.getUserId();
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.IMAGES}/${id}`, {
        method: 'DELETE',
        headers: userId ? { 'user-id': userId } : {},
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get public URL for image
  getPublicUrl(filePath: string): string {
    return `${MONGODB_API_URL}/files/${filePath}`;
  }
}

export const imageService = new ImageService();
