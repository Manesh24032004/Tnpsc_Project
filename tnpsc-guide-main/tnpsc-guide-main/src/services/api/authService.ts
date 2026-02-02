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

  // Set user data in localStorage
  setUserData(userId: string, email: string, name: string): void {
    localStorage.setItem('user_id', userId);
    localStorage.setItem('user_email', email);
    localStorage.setItem('user_name', name);
  }

  // Clear user data from localStorage
  clearUserData(): void {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
  }

  // Register - Saves to MongoDB
  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (data.success && data.data?.user) {
        // Store user data in localStorage
        this.setUserData(data.data.user._id, data.data.user.email, data.data.user.name);

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

  // Login - Fetches from MongoDB
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (data.success && data.data?.user) {
        // Store user data in localStorage
        this.setUserData(data.data.user._id, data.data.user.email, data.data.user.name);

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
