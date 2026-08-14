import { apiClient } from './client';

export interface PackageItem {
  itemId: string; // Product ID
  qty: number;
}

export interface Package {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  packageType: 'VEG' | 'NON_VEG';
  items: PackageItem[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackagePayload {
  name: string;
  price: number;
  imageUrl?: string;
  packageType: 'VEG' | 'NON_VEG';
  items: PackageItem[];
  isActive: boolean;
}

export interface PackagesResponse {
  success: boolean;
  data: Package[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginatedPackages {
  packages: Package[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PackageDetailResponse {
  success: boolean;
  message: string;
  data: Package;
}

// Fetch all packages from backend API.
// The backend rejects `limit` above 100, so that's the highest page size we can request.
export const getPackagesApi = async (): Promise<Package[]> => {
  const response = await apiClient.get<PackagesResponse>('/package', {
    params: { limit: 100 },
  });
  return response.data.data;
};

// Fetch packages with pagination metadata
export const getPackagesPaginatedApi = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<PaginatedPackages> => {
  const response = await apiClient.get<PackagesResponse>('/package', {
    params: { page, limit, search },
  });
  return {
    packages: response.data.data,
    pagination: response.data.pagination,
  };
};

// Create a new package in backend API
export const createPackageApi = async (payload: PackagePayload): Promise<Package> => {
  const response = await apiClient.post<PackageDetailResponse>('/package', payload);
  return response.data.data;
};

// Update an existing package in backend API
export const updatePackageApi = async (id: string, payload: Partial<PackagePayload>): Promise<Package> => {
  const response = await apiClient.put<PackageDetailResponse>(`/package/${id}`, payload);
  return response.data.data;
};

// Delete a package in backend API
export const deletePackageApi = async (id: string): Promise<void> => {
  await apiClient.delete(`/package/${id}`);
};
