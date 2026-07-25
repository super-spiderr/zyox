import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  getCustomersApi,
  getCustomersPaginatedApi,
  getCustomerByIdApi,
  createCustomerApi,
  updateCustomerApi,
  deleteCustomerApi,
  CustomerPayload,
} from '@/api/customer';

export const useCustomers = (page?: number, limit: number = 100, search?: string) => {
  return useQuery({
    queryKey: ['customers', page, limit, search],
    queryFn: () => getCustomersApi(page, limit, search),
    retry: 1,
  });
};

export const useCustomer = (id?: string) => {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => getCustomerByIdApi(id as string),
    enabled: !!id,
    retry: 1,
  });
};

export const useInfiniteCustomers = (limit: number = 10, search?: string) => {
  return useInfiniteQuery({
    queryKey: ['customers', 'infinite', limit, search],
    queryFn: ({ pageParam }) => getCustomersPaginatedApi(pageParam, limit, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const totalPages = lastPage.pagination?.totalPages ?? 0;
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
    retry: 1,
    staleTime: 60_000,
    refetchOnMount: false,
  });
};

export const useCreateCustomer = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      options?.onSuccess?.();
    },
    onError: err => {
      options?.onError?.(err);
    },
  });
};

export const useUpdateCustomer = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CustomerPayload> }) =>
      updateCustomerApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      options?.onSuccess?.();
    },
    onError: err => {
      options?.onError?.(err);
    },
  });
};

export const useDeleteCustomer = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      options?.onSuccess?.();
    },
    onError: err => {
      options?.onError?.(err);
    },
  });
};
