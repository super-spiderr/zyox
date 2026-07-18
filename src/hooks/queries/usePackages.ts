import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPackagesApi, createPackageApi, updatePackageApi, deletePackageApi, PackagePayload } from '@/api/package';

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: getPackagesApi,
    retry: 1,
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
