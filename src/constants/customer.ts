import { CustomerStatusFilter, CustomerTypeFilter } from '@/utils/customerFilters';
import { TranslationKey } from '@/constants/translations';

export const CUSTOMERS_PAGE_SIZE = 10;
export const CUSTOMERS_SKELETON_COUNT = 10;

export const CUSTOMERS_SKELETON_KEYS = Array.from(
  { length: CUSTOMERS_SKELETON_COUNT },
  (_, index) => `customer-skeleton-${index}`,
);

export const CUSTOMER_STATUS_FILTER_OPTIONS: Array<{
  value: CustomerStatusFilter;
  labelKey: TranslationKey;
}> = [
  { value: 'all', labelKey: 'allStatuses' },
  { value: 'active', labelKey: 'activeOnly' },
  { value: 'inactive', labelKey: 'inactiveOnly' },
];

export const CUSTOMER_TYPE_FILTER_OPTIONS: Array<{
  value: CustomerTypeFilter;
  labelKey: TranslationKey;
}> = [
  { value: 'all', labelKey: 'allTypes' },
  { value: 'individual', labelKey: 'individual' },
  { value: 'business', labelKey: 'business' },
];
