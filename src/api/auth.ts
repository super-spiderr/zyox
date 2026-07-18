import { apiClient } from './client';

export interface LoginCredentials {
  email?: string;
  password?: string;
}

export interface UserData {
  _id: string;
  email: string;
  firstName: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: UserData;
    token: string;
    refreshToken: string;
  };
}

export const loginApi = async (
  credentials: LoginCredentials,
): Promise<{ token: string; refreshToken: string; user: UserData }> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data.data;
};

export interface UserProfile {
  _id: string;
  firstName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export const getProfileApi = async (): Promise<UserProfile> => {
  const response = await apiClient.get<ProfileResponse>('/auth/me');
  return response.data.data;
};
