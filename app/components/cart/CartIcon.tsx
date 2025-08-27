'use client';
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';

export const CartIcon: React.FC = () => {
  const { itemCount, toggleCart } = useCartStore();

  return (
    <Button
      variant="ghost"
      size="md"
      onClick={toggleCart}
      className="relative p-2"
    >
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Button>
  );
};
