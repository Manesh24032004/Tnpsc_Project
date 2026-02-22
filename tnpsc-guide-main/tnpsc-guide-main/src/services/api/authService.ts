/**
 * Authentication Service - MongoDB Backend Only
 */

import { MONGODB_API_URL, API_ENDPOINTS } from './config';
import type { AuthResponse, LoginRequest, RegisterRequest, User, ApiResponse } from './types';

class AuthService {
  // Get stored user ID
  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  // Set user data - Only ID for session tracking
  setUserData(userId: string) {
    localStorage.setItem('user_id', userId);
  }

  // Clear user data
  clearUserData() {
    localStorage.removeItem('user_id');
  }

  // Register a new user
  async register(request: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      if (data.success && data.data?.user) {
        // Store user ID for session
        this.setUserData(data.data.user._id);

        // Add token for compatibility (use user ID as token)
        return {
          ...data,
          data: {
            ...data.data,
            token: data.data.user._id
          }
        };
      }
      return data;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Login a user
  async login(request: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      if (data.success && data.data?.user) {
        // Store user ID for session
        this.setUserData(data.data.user._id);

        // Add token for compatibility
        return {
          ...data,
          data: {
            ...data.data,
            token: data.data.user._id
          }
        };
      }
      return data;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Logout
  async logout(): Promise<ApiResponse<null>> {
    this.clearUserData();
    return { success: true };
  }

  // Get current user from MongoDB
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const userId = this.getUserId();
    if (!userId) {
      return { success: false, error: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.ME}`, {
        headers: { 'user-id': userId },
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Check if user is admin - Fetches from MongoDB
  async isAdmin(userId: string): Promise<boolean> {
    const storedUserId = this.getUserId();
    if (!storedUserId) return false;

    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.USER_ROLES}/${userId}`, {
        headers: { 'user-id': storedUserId },
      });
      const data = await response.json();
      return data.success && data.data?.role === 'admin';
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
