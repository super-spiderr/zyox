import { Customer } from '@/store/customerStore';
import { CustomerType } from '@/enums/customer';

export type CustomerStatusFilter = 'all' | 'active' | 'inactive';
export type CustomerTypeFilter = 'all' | 'individual' | 'business';
export type CustomerSortBy = 'name' | 'recently';

export const getCustomerId = (customer?: Customer | null): string => {
  if (!customer) return '';
  return customer._id || customer.id;
};

export const filterCustomersByStatus = (
  customers: Customer[],
  statusFilter: CustomerStatusFilter,
): Customer[] => {
  if (statusFilter === 'active') return customers.filter(c => c.isActive === true);
  if (statusFilter === 'inactive') return customers.filter(c => c.isActive === false);
  return customers;
};

export const filterCustomersByType = (
  customers: Customer[],
  typeFilter: CustomerTypeFilter,
): Customer[] => {
  if (typeFilter === 'individual') return customers.filter(c => c.customerType === CustomerType.INDIVIDUAL);
  if (typeFilter === 'business') return customers.filter(c => c.customerType === CustomerType.BUSINESS);
  return customers;
};

export const sortCustomers = (customers: Customer[], sortBy: CustomerSortBy): Customer[] => {
  if (sortBy === 'name') {
    return [...customers].sort((a, b) => a.customerName.localeCompare(b.customerName));
  }
  return [...customers].sort((a, b) => getCustomerId(b).localeCompare(getCustomerId(a))); // Descending order (newest first)
};

export const applyCustomerFiltersAndSort = (
  customers: Customer[],
  options: {
    statusFilter: CustomerStatusFilter;
    typeFilter: CustomerTypeFilter;
    sortBy: CustomerSortBy;
  },
): Customer[] => {
  let list = filterCustomersByStatus(customers, options.statusFilter);
  list = filterCustomersByType(list, options.typeFilter);
  return sortCustomers(list, options.sortBy);
};
