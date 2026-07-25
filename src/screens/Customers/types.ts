import React from 'react';
import { Customer } from '@/store/customerStore';
import { Order } from '@/api/order';
import { CustomerType } from '@/enums/customer';
import { CustomerStatusFilter, CustomerTypeFilter } from '@/utils/customerFilters';

export interface CustomerCardProps {
  customer: Customer;
  onPress: () => void;
}

export interface CustomerDetailModalProps {
  visible: boolean;
  onClose: () => void;
  customer: Customer | null;
  orders: Order[];
  onEditDetails: () => void;
  onDeactivate: () => void;
  onReactivate: () => void;
}

export interface CustomerFilterModalProps {
  visible: boolean;
  onClose: () => void;
  statusFilter: CustomerStatusFilter;
  setStatusFilter: (status: CustomerStatusFilter) => void;
  typeFilter: CustomerTypeFilter;
  setTypeFilter: (type: CustomerTypeFilter) => void;
}

export interface CustomerFormState {
  customerName: string;
  phoneNumber: string;
  customerType: CustomerType;
  address: string;
  alternatePhoneNumber: string;
  specialNotes: string;
}

export interface CustomerFormErrors {
  customerName?: string;
  phoneNumber?: string;
}

export interface CustomerTypeCardProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onPress: () => void;
}

export interface DeviceContact {
  name: string;
  phone: string;
}
