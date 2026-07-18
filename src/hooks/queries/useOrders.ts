import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrdersApi, createOrderApi, updateOrderApi, deleteOrderApi, OrderPayload } from '@/api/order';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrdersApi,
    retry: 1,
  });
};

export const useCreateOrder = (options?: { onSuccess?: () => void; onError?: (err: any) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useUpdateOrder = (options?: { onSuccess?: () => void; onError?: (err: any) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<OrderPayload> }) =>
      updateOrderApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useDeleteOrder = (options?: { onSuccess?: () => void; onError?: (err: any) => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};
