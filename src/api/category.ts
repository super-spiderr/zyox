import { apiClient } from './client';

export interface Category {
  _id: string;
  categoryName: string;
  isActive: boolean;
  imageUrl?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryPayload {
  categoryName: string;
  isActive?: boolean;
  imageUrl?: string;
  createdBy?: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface CategoryDetailResponse {
  success: boolean;
  message: string;
  data: Category;
}

// Fetch all categories from backend API
export const getCategoriesApi = async (search?: string): Promise<Category[]> => {
  const response = await apiClient.get<CategoriesResponse>('/category/', {
    params: search ? { search } : undefined,
  });
  return response.data.data;
};

// Create a new category in backend API
export const createCategoryApi = async (payload: CategoryPayload): Promise<Category> => {
  const response = await apiClient.post<CategoryDetailResponse>('/category/', payload);
  return response.data.data;
};

// Update an existing category in backend API
export const updateCategoryApi = async (id: string, payload: Partial<CategoryPayload>): Promise<Category> => {
  const response = await apiClient.put<CategoryDetailResponse>(`/category/${id}`, payload);
  return response.data.data;
};

// Delete a category in backend API
export const deleteCategoryApi = async (id: string): Promise<void> => {
  await apiClient.delete(`/category/${id}`);
};
