import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/types/product';

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
