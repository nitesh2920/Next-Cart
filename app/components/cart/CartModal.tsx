'use client';
import Image from 'next/image';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';

export const CartModal: React.FC = () => {
  const {
    isOpen,
    toggleCart,
    items,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    alert('Checkout here');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={toggleCart}
      title="Shopping Cart"
      className="max-w-2xl"
    >
      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-4">
            Start shopping to add items to your cart
          </p>
          <Button variant="primary" onClick={toggleCart}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    className="object-contain rounded"
                    sizes="64px"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {item.product.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    ${item.product.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity - 1)
                    }
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity + 1)
                    }
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-sm font-medium text-gray-900">
                  ${item.product.price * item.quantity}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                Total Items: {itemCount}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                Clear Cart
              </Button>
            </div>
            
            <div className="flex justify-between items-center text-lg text-black font-bold mb-4">
              <span>Total:</span>
              <span>${total}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={toggleCart}
                className="flex-1"
              >
                Continue Shopping
              </Button>
              <Button
                variant="primary"
                onClick={handleCheckout}
                className="flex-1"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
