import { apiClient } from './client';
import { Customer, CustomerType } from '@/store/customerStore';

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
}

export interface CustomerDetailResponse {
  success: boolean;
  message: string;
  data: Customer;
}

// Fetch all customers from backend API
export const getCustomersApi = async (): Promise<Customer[]> => {
  const response = await apiClient.get<CustomersResponse>('/customer');
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
