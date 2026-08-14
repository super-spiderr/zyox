import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrdersApi, createOrderApi, updateOrderApi, deleteOrderApi, Order, OrderPayload } from '@/api/order';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrdersApi,
    retry: 1,
  });
};

export const useCreateOrder = (options?: {
  onSuccess?: (order: Order) => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrderApi,
    onSuccess: (newOrder) => {
      // Seed the cache immediately so a screen navigating straight to this
      // order (e.g. OrderDetail) doesn't hit a stale "not found" state
      // while invalidateQueries' refetch is still in flight.
      queryClient.setQueryData<Order[]>(['orders'], prev =>
        prev ? [newOrder, ...prev] : [newOrder],
      );
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      options?.onSuccess?.(newOrder);
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
