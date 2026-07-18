import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCustomersApi, createCustomerApi, updateCustomerApi, deleteCustomerApi, CustomerPayload } from '@/api/customer';

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: getCustomersApi,
    retry: 1,
  });
};

export const useCreateCustomer = (options?: { onSuccess?: () => void; onError?: (err: any) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useUpdateCustomer = (options?: { onSuccess?: () => void; onError?: (err: any) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CustomerPayload> }) =>
      updateCustomerApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useDeleteCustomer = (options?: { onSuccess?: () => void; onError?: (err: any) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};
