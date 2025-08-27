import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem } from '@/types/cart';
import { Product } from '@/types/product';

interface CartStore extends Cart {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isOpen: false,

      addItem: (product: Product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { product, quantity }];
          }

          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const newItemCount = newItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: newItems,
            total: newTotal,
            itemCount: newItemCount,
          };
        }),

      removeItem: (productId: number) =>
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.product.id !== productId
          );
          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const newItemCount = newItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: newItems,
            total: newTotal,
            itemCount: newItemCount,
          };
        }),

      updateQuantity: (productId: number, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            return get().removeItem(productId);
          }

          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const newItemCount = newItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: newItems,
            total: newTotal,
            itemCount: newItemCount,
          };
        }),

      clearCart: () =>
        set({
          items: [],
          total: 0,
          itemCount: 0,
        }),

      toggleCart: () =>
        set((state) => ({
          isOpen: !state.isOpen,
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
);
