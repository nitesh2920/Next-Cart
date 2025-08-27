'use client';
import React from 'react';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useProductStore } from '@/store/productStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { setSelectedProduct } = useProductStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleCardClick = () => {
    setSelectedProduct(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
    >
      <div className="relative aspect-square p-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className="flex items-center space-x-1"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
