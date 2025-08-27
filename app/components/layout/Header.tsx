'use client';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterDropdown } from '@/components/search/FilterDropdown';
import { CartIcon } from '@/components/cart/CartIcon';
import { Button } from '@/components/ui/Button';
import { useProductStore } from '@/store/productStore';

export const Header: React.FC = () => {
  const { clearFilters } = useProductStore();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Logo/Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              E-Commerce Store
            </h1>
            <div className="lg:hidden">
              <CartIcon />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3  lg:flex-1 lg:justify-center lg:max-w-4xl">
            <SearchBar />
            <FilterDropdown />
            <Button
              variant="outline"
              size="md"
              onClick={clearFilters}
              className="sm:w-auto"
            >
              Clear Filters
            </Button>
          </div>

          {/* Cart Icon (Desktop) */}
          <div className="hidden lg:block">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};
