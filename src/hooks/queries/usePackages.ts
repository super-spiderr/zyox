import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import {
  getPackagesApi,
  getPackagesPaginatedApi,
  createPackageApi,
  updatePackageApi,
  deletePackageApi,
  PackagePayload,
} from '@/api/package';

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: getPackagesApi,
    retry: 1,
  });
};

export const useInfinitePackages = (limit: number = 10, search?: string) => {
  return useInfiniteQuery({
    queryKey: ['packages', 'infinite', limit, search],
    queryFn: ({ pageParam }) => getPackagesPaginatedApi(pageParam, limit, search),
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

export const useCreatePackage = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPackageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useUpdatePackage = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<PackagePayload> }) =>
      updatePackageApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};

export const useDeletePackage = (options?: {
  onSuccess?: () => void;
  onError?: (err: any) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePackageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      options?.onSuccess?.();
    },
    onError: (err) => {
      options?.onError?.(err);
    },
  });
};
