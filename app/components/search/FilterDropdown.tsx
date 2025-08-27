'use client';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useProductStore } from '@/store/productStore';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const FilterDropdown: React.FC = () => {
  const { data: categories, isLoading, error } = useCategories();
  const { filters, setCategory } = useProductStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleCategorySelect = (category: string) => {
    setCategory(category);
    setIsOpen(false);
  };

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Failed to load categories
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={isLoading}
      >
        <span className="truncate capitalize">
          {filters.category ? filters.category : 'All Categories'}
        </span>
        {isLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-2" />
        )}
      </button>

      {isOpen && categories && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="py-1">
            <button
              onClick={() => handleCategorySelect('')}
              className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                !filters.category ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 capitalize ${
                  filters.category === category
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
