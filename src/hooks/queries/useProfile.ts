import { useQuery } from '@tanstack/react-query';
import { getProfileApi } from '@/api/auth';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfileApi,
    retry: 1,
  });
};
