import { create } from 'zustand';
import { ProductFilters } from '@/types/product';

interface ProductStore {
  filters: ProductFilters;
  selectedProductId: number | null;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSelectedProduct: (id: number | null) => void;
  clearFilters: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  filters: {
    search: '',
    category: '',
  },
  selectedProductId: null,
  
  setSearch: (search: string) =>
    set((state) => ({
      filters: { ...state.filters, search },
    })),
    
  setCategory: (category: string) =>
    set((state) => ({
      filters: { ...state.filters, category },
    })),
    
  setSelectedProduct: (id: number | null) =>
    set({ selectedProductId: id }),
    
  clearFilters: () =>
    set({
      filters: { search: '', category: '' },
    }),
}));
