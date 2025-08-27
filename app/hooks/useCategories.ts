import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/lib/api';

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
