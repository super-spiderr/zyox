import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  getCategoriesApi,
  getCategoriesPaginatedApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  CategoryPayload,
} from '@/api/category';

export const useCategories = (search?: string) => {
  return useQuery({
    queryKey: ['categories', search],
    queryFn: () => getCategoriesApi(search),
    retry: 1,
  });
};

export const useInfiniteCategories = (limit: number = 10, search?: string) => {
  return useInfiniteQuery({
    queryKey: ['categories', 'infinite', limit, search],
    queryFn: ({ pageParam }) => getCategoriesPaginatedApi(pageParam, limit, search),
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

export const useCreateCategory = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useUpdateCategory = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CategoryPayload> }) =>
      updateCategoryApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useDeleteCategory = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};
