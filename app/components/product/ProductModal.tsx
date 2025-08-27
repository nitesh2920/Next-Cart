'use client';
import React from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { fetchProductById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const ProductModal: React.FC = () => {
  const { selectedProductId, setSelectedProduct } = useProductStore();
  const { addItem, items } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', selectedProductId],
    queryFn: () => fetchProductById(selectedProductId!),
    enabled: !!selectedProductId,
  });

  const currentCartItem = React.useMemo(() => {
    return items.find(item => item.product.id === selectedProductId);
  }, [items, selectedProductId]);

  const handleClose = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      handleClose();
    }
  };

  const adjustQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (!selectedProductId) return null;

  return (
    <Modal
      isOpen={!!selectedProductId}
      onClose={handleClose}
      className="max-w-4xl"
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600">Failed to load product details</p>
        </div>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          {/* Product Image */}
          <div className="relative aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded capitalize">
                {product.category}
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="text-3xl font-bold text-gray-900 mb-6">
             $ {product.price}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-sm font-medium text-gray-900 mr-4">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 rounded-lg ">
                <button
                  onClick={() => adjustQuantity(-1)}
                  className="p-2 hover:bg-gray-50 transition-colors "
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => adjustQuantity(1)}
                  className="p-2 hover:bg-gray-50 transition-colors "
                >
                  <Plus className="w-4 h-4 text-black"  />
                </button>
              </div>
            </div>

            {/* Cart Info */}
            {currentCartItem && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700">
                  Currently in cart: {currentCartItem.quantity} item(s)
                </p>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add {quantity} to Cart</span>
            </Button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};
