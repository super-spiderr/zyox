import { apiClient } from './client';

export type PaymentStatus = 'PENDING' | 'PAID' | 'PARTIAL';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export type OrderItemType = 'PACKAGE' | 'PRODUCT';

export interface OrderItem {
  type: OrderItemType;
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  _id: string;
  customerId: string | { _id: string; customerName: string; phoneNumber?: string };
  attributes: {
    eventName: string;
    guestCount: number;
  };
  deliveryDate: string;
  orderItems: OrderItem[];
  discountAmount: number;
  advanceAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  completedAt?: string;
  quotationUrl?: string;
  invoiceUrl?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderPayload {
  customerId: string;
  eventName: string;
  eventDate: string;
  guestCount: number;
  orderItems: OrderItem[];
  discountAmount: number;
  advanceAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  completedAt?: string;
  quotationUrl?: string;
  invoiceUrl?: string;
  notes?: string;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
}

export interface OrderDetailResponse {
  success: boolean;
  message: string;
  data: Order;
}

// Fetch all orders from backend API
export const getOrdersApi = async (): Promise<Order[]> => {
  const response = await apiClient.get<OrdersResponse>('/order');
  return response.data.data;
};

// Create a new order in backend API
export const createOrderApi = async (payload: OrderPayload): Promise<Order> => {
  const response = await apiClient.post<OrderDetailResponse>('/order', payload);
  return response.data.data;
};

// Update an existing order in backend API
export const updateOrderApi = async (
  id: string,
  payload: Partial<OrderPayload>,
): Promise<Order> => {
  const response = await apiClient.put<OrderDetailResponse>(`/order/${id}`, payload);
  return response.data.data;
};

// Delete an order in backend API
export const deleteOrderApi = async (id: string): Promise<void> => {
  await apiClient.delete(`/order/${id}`);
};
