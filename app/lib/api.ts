import type { Product } from "@/types/product";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com';

export const apiEndpoints = {
  products: `${API_BASE_URL}/products`,
  categories: `${API_BASE_URL}/products/categories`,
  productsByCategory: (category: string) => `${API_BASE_URL}/products/category/${category}`,
  productById: (id: number) => `${API_BASE_URL}/products/${id}`,
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(apiEndpoints.products);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(apiEndpoints.categories);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(apiEndpoints.productById(id));
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  return response.json();
};