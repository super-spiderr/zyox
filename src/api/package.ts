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
}

export interface PackageDetailResponse {
  success: boolean;
  message: string;
  data: Package;
}

// Fetch all packages from backend API
export const getPackagesApi = async (): Promise<Package[]> => {
  const response = await apiClient.get<PackagesResponse>('/package');
  return response.data.data;
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
