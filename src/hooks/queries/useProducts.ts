import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  getProductsApi,
  getProductsPaginatedApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  ProductPayload,
} from '@/api/product';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProductsApi,
    retry: 1,
  });
};

export const useInfiniteProducts = (limit: number = 10, search?: string) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', limit, search],
    queryFn: ({ pageParam }) => getProductsPaginatedApi(pageParam, limit, search),
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

export const useCreateProduct = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useUpdateProduct = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<ProductPayload> }) =>
      updateProductApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useDeleteProduct = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};
