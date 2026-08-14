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
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginatedProducts {
  products: Product[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductDetailResponse {
  success: boolean;
  message: string;
  data: Product;
}

// Fetch all products from backend API.
// The backend rejects `limit` above 100, so that's the highest page size we can request.
export const getProductsApi = async (): Promise<Product[]> => {
  const response = await apiClient.get<ProductsResponse>('/product', {
    params: { limit: 100 },
  });
  return response.data.data;
};

// Fetch products with pagination metadata
export const getProductsPaginatedApi = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<PaginatedProducts> => {
  const response = await apiClient.get<ProductsResponse>('/product', {
    params: { page, limit, search },
  });
  return {
    products: response.data.data,
    pagination: response.data.pagination,
  };
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
