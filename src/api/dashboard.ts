import { apiClient } from './client';

export interface DashboardOverview {
  totalRevenue: number;
  totalCollected: number;
  totalPending: number;
  totalOrdersCount: number;
  totalCustomersCount: number;
  totalProductsCount: number;
  totalPackagesCount: number;
  totalCategoriesCount: number;
}

export interface OrderStatusDistribution {
  PENDING: number;
  CONFIRMED: number;
  COMPLETED: number;
  CANCELLED: number;
}

export interface PaymentStatusDistribution {
  PENDING: number;
  PARTIAL: number;
  PAID: number;
  FAILED: number;
}

export interface RecentOrderCustomer {
  _id: string;
  customerName: string;
  phoneNumber: string;
}

export interface RecentOrderItem {
  type: 'PRODUCT' | 'PACKAGE';
  itemId: string;
  itemModel: 'Product' | 'Package';
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface RecentOrder {
  _id: string;
  orderNumber: string;
  customerId: RecentOrderCustomer;
  attributes: {
    eventName: string;
    guestCount: number;
  };
  deliveryDate: string;
  guestCount: number;
  orderItems: RecentOrderItem[];
  subTotal: number;
  discountAmount: number;
  totalAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  paymentStatus: 'PENDING' | 'PARTIAL' | 'PAID' | 'FAILED';
  orderStatus: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  completedAt: string;
  quotationUrl: string;
  invoiceUrl: string;
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RevenueTrendPoint {
  date: string;
  revenue: number;
  ordersCount: number;
}

export interface DashboardData {
  overview: DashboardOverview;
  orderStatusDistribution: OrderStatusDistribution;
  paymentStatusDistribution: PaymentStatusDistribution;
  recentOrders: RecentOrder[];
  revenueTrend: RevenueTrendPoint[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

export const getDashboardApi = async (): Promise<DashboardData> => {
  const response = await apiClient.get<DashboardResponse>('/dashboard');
  return response.data.data;
};
