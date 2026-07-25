import { apiClient } from './client';
import { Customer } from '@/store/customerStore';
import { CustomerType } from '@/enums/customer';

export interface CustomerPayload {
  customerName: string;
  phoneNumber: string;
  customerType: CustomerType;
  address?: string;
  alternatePhoneNumber?: string;
  specialNotes?: string;
  isActive?: boolean;
}

export interface CustomersResponse {
  success: boolean;
  data: Customer[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginatedCustomers {
  customers: Customer[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CustomerDetailResponse {
  success: boolean;
  message: string;
  data: Customer;
}

// Fetch all customers from backend API
export const getCustomersApi = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<Customer[]> => {
  const response = await apiClient.get<CustomersResponse>('/customer', {
    params: { page, limit, search },
  });
  return response.data.data;
};

// Fetch customers with pagination metadata
export const getCustomersPaginatedApi = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<PaginatedCustomers> => {
  const response = await apiClient.get<CustomersResponse>('/customer', {
    params: { page, limit, search },
  });
  return {
    customers: response.data.data,
    pagination: response.data.pagination,
  };
};

// Fetch a single customer by id from backend API
export const getCustomerByIdApi = async (id: string): Promise<Customer> => {
  const response = await apiClient.get<CustomerDetailResponse>(`/customer/${id}`);
  return response.data.data;
};

// Create a new customer in backend API
export const createCustomerApi = async (payload: CustomerPayload): Promise<Customer> => {
  const response = await apiClient.post<CustomerDetailResponse>('/customer', payload);
  return response.data.data;
};

// Update an existing customer in backend API
export const updateCustomerApi = async (id: string, payload: Partial<CustomerPayload>): Promise<Customer> => {
  const response = await apiClient.put<CustomerDetailResponse>(`/customer/${id}`, payload);
  return response.data.data;
};

// Delete a customer in backend API (Fastify PUT /:id/delete route)
export const deleteCustomerApi = async (id: string): Promise<Customer> => {
  const response = await apiClient.put<CustomerDetailResponse>(`/customer/${id}/delete`);
  return response.data.data;
};
