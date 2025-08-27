'use client';
import React from 'react';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useProducts } from '@/hooks/useProducts';
import { useProductStore } from '@/store/productStore';
import { Product } from '@/types/product';

export const ProductGrid: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const { filters } = useProductStore();

  const filteredProducts = React.useMemo(() => {
    if (!products) return [];

    return products.filter((product: Product) => {
      const matchesSearch = filters.search
        ? product.title.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      
      const matchesCategory = filters.category
        ? product.category === filters.category
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, filters]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold mb-2">Failed to load products</p>
          <p className="text-sm">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-center">
          <p className="text-lg font-semibold mb-2">No products found</p>
          <p className="text-sm">
            {filters.search || filters.category
              ? 'Try adjusting your search or filter criteria'
              : 'No products available at the moment'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
