import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/utils/storage';

export type CustomerType = 'INDIVIDUAL' | 'BUSINESS';

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

const initialMockCustomers: Customer[] = [
  {
    id: 'cust-1',
    customerName: 'Ananya Sharma',
    phoneNumber: '9876543210',
    customerType: 'INDIVIDUAL',
    address: 'Flat 402, Skyline Residency, Bangalore',
    alternatePhoneNumber: '9123456780',
    specialNotes: 'Prefers deliveries in the morning',
    isActive: true,
  },
  {
    id: 'cust-2',
    customerName: 'Vignesh Balasubramaniyan',
    phoneNumber: '9123456789',
    customerType: 'INDIVIDUAL',
    address: '12th Cross Road, Indira Nagar, Bangalore',
    isActive: true,
  },
  {
    id: 'cust-3',
    customerName: 'Rahul Corporate Services',
    phoneNumber: '9888877777',
    customerType: 'BUSINESS',
    address: 'Kochi Tech Park Phase 2, Kochi',
    specialNotes: 'Needs GST billing invoice',
    isActive: true,
  },
];

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: initialMockCustomers,
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
