import { useQuery } from '@tanstack/react-query';
import { getDashboardApi } from '@/api/dashboard';

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardApi,
    retry: 1,
  });
};
