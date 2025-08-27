'use client';
import { Header } from '@/components/layout/Header';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductModal } from '@/components/product/ProductModal';
import { CartModal } from '@/components/cart/CartModal';
import { AddProductButton } from '@/components/product/AddProductButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
    
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Page Title and Add Product Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              All Products
            </h2>
            <p className="text-gray-600">
              Discover our amazing collection of products
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <AddProductButton />
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </main>

      {/* Modals */}
      <ProductModal />
      <CartModal />
    </div>
  );
}
