import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';
import { CustomerType } from '@/enums/customer';

export interface Customer {
  id: string;
  _id?: string;
  customerName: string;
  phoneNumber: string;
  customerType: CustomerType;
  address?: string;
  alternatePhoneNumber?: string;
  specialNotes?: string;
  isActive: boolean;
}

interface CustomerState {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: [],
      addCustomer: (customer) =>
        set((state) => ({
          customers: [
            ...state.customers,
            { ...customer, id: `cust-${Date.now()}` },
          ],
        })),
      updateCustomer: (updatedCustomer) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === updatedCustomer.id ? updatedCustomer : c
          ),
        })),
      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id ? { ...c, isActive: false } : c
          ),
        })),
    }),
    {
      name: 'zyox-customer-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useCustomerStore;
