import { apiClient } from './client';

export interface Product {
  _id: string;
  productName: string;
  categoryIds: string[];
  price: number;
  unit: string;
  productType: 'VEG' | 'NON_VEG';
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductPayload {
  productName: string;
  categoryIds: string[];
  price: number;
  unit: string;
  productType: 'VEG' | 'NON_VEG';
  imageUrl?: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: Product;
}

// Fetch all products from backend API
export const getProductsApi = async (): Promise<Product[]> => {
  const response = await apiClient.get<ProductsResponse>('/product');
  return response.data.data;
};

// Create a new product in backend API
export const createProductApi = async (payload: ProductPayload): Promise<Product> => {
  const response = await apiClient.post<ProductDetailResponse>('/product', payload);
  return response.data.data;
};

// Update an existing product in backend API
export const updateProductApi = async (id: string, payload: Partial<ProductPayload>): Promise<Product> => {
  const response = await apiClient.put<ProductDetailResponse>(`/product/${id}`, payload);
  return response.data.data;
};

// Delete a product in backend API
export const deleteProductApi = async (id: string): Promise<void> => {
  await apiClient.delete(`/product/${id}`);
};
